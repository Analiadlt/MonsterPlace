import React from "react";

import {app} from "../firebase"

const SignOutButton = () => {
  
  const signOut = async () => {
    try {
      if (app) {
        await app.auth().signOut();
        alert("Successfully signed out!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <h4>Sign out</h4>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default SignOutButton;
