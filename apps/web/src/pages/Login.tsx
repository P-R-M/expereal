import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { GoogleAuthProvider } from "firebase/auth";
import { LoginComp } from "ui";
import { auth } from "../firebase";

function LoginPage() {
  const [user] = useAuthState(auth);
  const navigation = useNavigate();

  if (!!user) {
    navigation("/dashboard");
  }

  return (
    <div>
      <LoginComp googleAuthProvider={GoogleAuthProvider} auth={auth} log={console.log} />
    </div>
  );
}

export default LoginPage;
