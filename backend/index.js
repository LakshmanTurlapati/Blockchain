const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const Web3 = require("web3");
const { abi, networks } = require("./build/contracts/Patient.json");
const monitor = require("./build/contracts/Monitor.json");
const doctor = require("./build/contracts/Doctor.json");
const { Data } = require("./models/data");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const DataRoute = require("./views/data");
const { User } = require("./models/user");
const { Client, LocalAuth } = require("whatsapp-web.js");
const client = new Client({
  authStrategy: new LocalAuth(),
});
const qrcode = require("qrcode-terminal");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CONNECTED"))
  .catch((err) => console.error(err));

app.use(cors());

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API");
});

app.use("/", DataRoute);

server.listen(process.env.PORT, () => {
  console.log("Server Started At Port : " + process.env.PORT);
});

if (process.env.ENV === "development") {
  client.initialize();
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Client is ready!");
  });
}

const initializeWeb3 = async (web3) => {
  const account = await web3.eth.accounts.privateKeyToAccount(
    process.env.PRIVATE_KEY
  );

  // console.log(account, process.env.PRIVATE_KEY);
  const patient = new web3.eth.Contract(abi, networks[3].address);
  const Monitor = new web3.eth.Contract(
    monitor.abi,
    monitor.networks[3].address
  );
  const Doctor = new web3.eth.Contract(doctor.abi, doctor.networks[3].address);
  const totalLength = await patient.methods.totalPatientsLength().call();
  console.log(totalLength);

  let count = 0;
  io.on("connection", (socket) => {
    setInterval(async () => {
      for (let i = 0; i < totalLength; i++) {
        const pId = await patient.methods.getPatientId(i).call();
        const patientData = await patient.methods.getPatient(pId).call();

        const { pulse, spo2, temp } = generateRandom("NORMAL");
        const savedData = await new Data({
          user: pId.toLowerCase(),
          pulse: pulse,
          spo2: spo2,
          temp: temp,
        }).save();
        const user = await User.findOne({ publicId: pId });

        socket.emit(pId.toLowerCase(), {
          type: "NORMAL",
          pulse: pulse,
          spo2: spo2,
          temp: temp,
        });
        count++;
        if (count === 3) {
          const { pulse, spo2, temp } = generateRandom("CRITICAL");
          const tx = Monitor.methods.addPatientData(
            pId,
            pulse.toString(),
            spo2.toString(),
            temp.toString()
          );
          const gas = await tx.estimateGas({ from: account.address });
          const gasPrice = (
            Number(await web3.eth.getGasPrice()) * 1
          ).toString();
          const data = tx.encodeABI();
          const nonce = await web3.eth.getTransactionCount(account.address);

          const signedTx = await web3.eth.accounts.signTransaction(
            {
              to: Monitor.options.address,
              data,
              gas,
              gasPrice,
            },
            process.env.PRIVATE_KEY
          );

          const receipt = await web3.eth.sendSignedTransaction(
            signedTx.rawTransaction
          );

          socket.emit(pId.toLowerCase(), {
            type: "CRITICAL",
            pulse: pulse,
            spo2: spo2,
            temp: temp,
          });

          if (patientData[0] != patientData[7] && user) {
            const _doctor = await User.findOne({ publicId: patientData[7] });
            console.log(user.phone, _doctor.phone);
            const { name, publicId } = user;

            if (process.env.ENV === "development") {
              const PatientChatId = user.phone.substring(1) + "@c.us";
              const DoctorChatId = _doctor.phone.substring(1) + "@c.us";
              console.log(client.info);
              if (client.info) {
                console.log("send Message");
                // client.sendMessage(
                //   PatientChatId,
                //   `Alert !! Patient : ${name} Bearing Id ${publicId} is critical Please Checkout`
                // );
                // client.sendMessage(
                //   DoctorChatId,
                //   `Alert !! Patient : ${name} Bearing Id ${publicId} is critical Please Checkout`
                // );
              }
            }
          }
          // const res = triggerSMS();

          count = 0;
        }
      }
    }, 3000);
  });
};

function generateRandom(type) {
  return type === "NORMAL"
    ? {
        type: "NORMAL",
        pulse: Math.random() * (140 - 60) + 60,
        spo2: Math.random() * (99 - 94) + 94,
        temp: Math.random() * (99 - 96) + 96,
      }
    : {
        type: "CRITICAL",
        pulse: (Math.random() * (150 - 120) + 40).toFixed(2).toString(),
        spo2: (Math.random() * (90 - 50) + 50).toFixed(2).toString(),
        temp: (Math.random() * (150 - 100) + 100).toFixed(2).toString(),
      };
}

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/8c423580f9cf440999999783eabccfeb"
  )
);

initializeWeb3(web3);

process.on("SIGINT", async () => {
  console.log("(SIGINT) Shutting down...");
  await client.destroy();
  process.exit(0);
});
