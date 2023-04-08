import React from "react";
import { useSelector } from "react-redux";
// import { isLoaded, isEmpty } from "react-redux-firebase";
import firebase from "../firebase";
import { RootState } from "../store";
import { LoginComp } from "ui";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const auth = useSelector((state: RootState) => state.firebase.auth);
  const navigation = useNavigate();

  if(auth.uid) {
    navigation("/dashboard")
  }

  return (
    <div>
      <LoginComp firebase={firebase} />
      {/* <div>
        <h2>Auth</h2>
        {!isLoaded(auth) ? (
          <span>Loading...</span>
        ) : isEmpty(auth) ? (
          <span>Not Authenticated</span>
        ) : (
          <pre>{JSON.stringify(auth, null, 2)}</pre>
        )}
      </div> */}
    </div>
  );
}

export default LoginPage;
