import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import { useHistory } from 'react-router-dom'; // if you use react-router
// import GoogleButton from 'react-google-button' // optional

interface LoginProps {
  firebase: any;
  auth: any;
  isLoaded: any;
  isEmpty: any;
  navigate: any;
}

export const LoginPage = (props: LoginProps) => {
  //   const firebase = useFirebase();
  //   const auth = useSelector((state) => state.firebase.auth);
  const { firebase, auth, isLoaded, isEmpty, navigate } = props;

  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: "popup",
          signInSuccessUrl: "/signedIn",
          signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
          callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
              firebase.handleRedirectResult(authResult).then(() => {
                navigate(redirectUrl); // if you use react router to redirect
              });
              return false;
            },
          },
        }}
        firebaseAuth={firebase.auth()}
      />
      <div>
        <h2>Auth</h2>
        {!isLoaded(auth) ? (
          <span>Loading...</span>
        ) : isEmpty(auth) ? (
          <span>Not Authed</span>
        ) : (
          <pre>{JSON.stringify(auth, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
