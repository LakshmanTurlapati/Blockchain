import React, { useEffect } from "react";
import { getRole, useHealth } from "../../context/health";
import useCheckWallet from "../../hooks/useCheckWallet";
import Header from "./Header";
import "./index.css";
import Loader from "../../components/Loader";
import SideNav from "../SideNav";
import LoaderIcon from "../../assets/loader.gif";
import { loaderType } from "../../util/constants";
import useLoader from "../../hooks/useLoader";

const Index = ({ children, loader = false }) => {
  const [currentAccount, connectWalletHandler] = useCheckWallet();
  const health = useHealth();

  const getRoleContract = async () => {
    const { dispatch } = health;
    currentAccount && dispatch({ ...(await getRole(currentAccount)) });
  };

  const loaderMap = {
    [loaderType.TRANSACTION]: (
      <>
        <img className="loading-icon" src={LoaderIcon} />
        <div>Please Confirm The Transaction</div>
      </>
    ),
    [loaderType.DATA]: (
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    ),
  };

  useEffect(() => {
    getRoleContract();
  }, [currentAccount]);

  return (
    <>
      {loader && <Loader>{loaderMap[loader]}</Loader>}
      <Header />
      <div className="home-container">
        <SideNav />
        <div className="container"> {children}</div>
      </div>
    </>
  );
};

export default Index;
