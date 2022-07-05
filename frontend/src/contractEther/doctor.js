import doctor from "../contracts/Doctor.json";
import { ethers } from "ethers";

const doctorContract = () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const doctorContract = new ethers.Contract(
        doctor.networks[3].address,
        doctor.abi,
        signer
      );

      return doctorContract;
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (err) {
    console.log(err);
  }
};

export default doctorContract;
