import assign from "../contracts/Assign.json";
import { ethers } from "ethers";

const assignContract = () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const assignContract = new ethers.Contract(
        assign.networks[3].address,
        assign.abi,
        signer
      );

      return assignContract;
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (err) {
    console.log(err);
  }
};

export default assignContract;
