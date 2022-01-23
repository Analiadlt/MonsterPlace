import React from "react";
import LoginMetamask from "./LoginMetamask";
import { useMoralis } from "react-moralis";

export default function Home() {
  const { isAuthenticated, logout } = useMoralis();
  const { user } = useMoralis();
  console.log(user);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>
            Wallet conectada exitosamente!
            <button onClick={logout}>Sign Out</button>
          </p>
        </div>
      ) : (
        <LoginMetamask />
      )}
    </div>
  );
}
