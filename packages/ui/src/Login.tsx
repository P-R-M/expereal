import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

type LoginProps = {
  // tslint:disable-next-line:no-any
  googleAuthProvider: any;
  // tslint:disable-next-line:no-any
  auth: any;
};

export const LoginComp = ({ googleAuthProvider, auth }: LoginProps) => {
  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: "popup",
          signInSuccessUrl: "/signedIn",
          signInOptions: [googleAuthProvider.PROVIDER_ID],
          callbacks: {
            signInSuccessWithAuthResult: () => {
              return false;
            },
          },
        }}
        firebaseAuth={auth}
      />
    </div>
  );
};
