import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

type LoginProps = {
  // tslint:disable-next-line:no-any
  googleAuthProvider: any;
  // tslint:disable-next-line:no-any
  auth: any;
  // tslint:disable-next-line:no-any
  log: (...data: any[]) => void;
};

export const LoginComp = ({ googleAuthProvider, auth, log }: LoginProps) => {

  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: "popup",
          signInSuccessUrl: "/signedIn",
          signInOptions: [googleAuthProvider.PROVIDER_ID],
          callbacks: {
            signInSuccessWithAuthResult: (_authResult, redirectUrl) => {
              log(_authResult, redirectUrl);
              return false;
            },
          },
        }}
        firebaseAuth={auth}
      />
    </div>
  );
};
