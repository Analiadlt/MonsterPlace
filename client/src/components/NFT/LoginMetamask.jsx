import React from "react";
// import styles from "../styles/Login.module.css";
// import Image from "next/image";
// import icon from "./Images/Moralis-Favicon.svg";
import { useMoralis } from "react-moralis";




function LoginMetamask() {
  const { authenticate, authError} = useMoralis();
  return (
    
    <div className="login_container">
      <div className="login_card">
        <div className="sign_in_container">
          {authError && (
            <p className="error">
              {authError.name}
              {authError.message}
            </p>
          )}
          <button
            className={"button_login"} onClick={authenticate}
          >
            Login Metamask
          </button>
        </div>
      </div>
    </div>
   
  );
}

export default LoginMetamask;
