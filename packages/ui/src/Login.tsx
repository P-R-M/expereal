import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

type LoginProps = {
  firebase: any
}

export const LoginComp = ({  firebase }: LoginProps) => {

  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: "popup",
          signInSuccessUrl: "/signedIn",
          signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
          callbacks: {
            signInSuccessWithAuthResult: (_authResult, _redirectUrl) => {
              // firebase.handleRedirectResult(authResult).then(() => {
              //   // history.push(redirectUrl); if you use react router to redirect
              // });
              return false;
            },
          },
        }}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
}
