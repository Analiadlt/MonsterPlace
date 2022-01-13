import React from "react";

import useInput from "./useInput";
import {app} from "../firebase";

const SignInForm = () => {
  const email = useInput("");
  const password = useInput("");

  const signIn = async (event) => {
    event.preventDefault();

    try {
      if (app) {
        const user = await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        console.log("user", user);
        alert("Bienvenido!");
      }
    } catch (error) {
     console.log("error");
     alert(error);
     
    }
  };

  return (
    <form onSubmit={signIn}>
      <h4>Sign in</h4>
      <input placeholder="Email" {...email} />
      <input placeholder="Password" type="password" {...password} />
      <button type="submit">Sign in</button>
    </form>
  );
};

export default SignInForm;
