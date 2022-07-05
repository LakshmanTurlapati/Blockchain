import assign from "../contracts/Patient.json";
import { ethers } from "ethers";

const patientContract = () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const patientContract = new ethers.Contract(
        assign.networks[3].address,
        assign.abi,
        signer
      );

      return patientContract;
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (err) {
    console.log(err);
  }
};

export default patientContract;
