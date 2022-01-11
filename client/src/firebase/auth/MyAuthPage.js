import React, { useState, useEffect } from "react";
import 'firebase/compat/auth';
import {app} from "../firebase";

import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import SignOutButton from "./SignOutButton";

export default function MyAuthPage() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
   
    if (app) {
      app.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          setCurrentUser(authUser.email);
        } else {
          setCurrentUser(null);
        }
      });
    }
  }, []);

  return (
    <div>
      <h1>Firebase Auth</h1>
      <h2>
        {currentUser
          ? `The current logged in user is: ${currentUser}.`
          : "No user is currently logged in."}
      </h2>
      <SignUpForm />
      
      <SignInForm />

      <SignOutButton />
    </div>
  );
}