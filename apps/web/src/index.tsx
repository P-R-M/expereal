import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import "./index.css";
import App from "./App";
import { store } from "./store";
import firebase from "./firebase";
import reportWebVitals from "./reportWebVitals";

const firebaseConfig = {
  userProfile: "users",
  profileParamsToPopulate: [
    { child: 'role', root: 'roles' }, // populates user's role with matching role object from roles
  ]
};

const rrfProps = {
  firebase,
  config: firebaseConfig,
  dispatch: store.dispatch,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<App />} />
              {/* <Route path="blogs" element={<Blogs />} />
              <Route path="contact" element={<Contact />} /> */}
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
