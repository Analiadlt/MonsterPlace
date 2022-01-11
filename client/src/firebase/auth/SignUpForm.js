import React from "react";
import {app} from "../firebase";
import useInput from "./useInput";

const SignUpForm = () => {
  const email = useInput("");
  const password = useInput("");

  const signUp = async (event) => {
    event.preventDefault();

    try {
      if (app) {
        const user = await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        console.log("user", user);
        alert(`Welcome ${email.value}!`);
      }
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={signUp}>
      <h4>Sign up</h4>
      <input placeholder="Email" {...email} />
      <input placeholder="Password" type="password" {...password} />
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUpForm;
