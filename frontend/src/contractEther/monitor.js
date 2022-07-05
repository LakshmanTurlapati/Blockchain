import monitor from "../contracts/Monitor.json";
import { ethers } from "ethers";

const monitorContract = () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const monitorContract = new ethers.Contract(
        monitor.networks[3].address,
        monitor.abi,
        signer
      );

      return monitorContract;
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (err) {
    console.log(err);
  }
};

export default monitorContract;
