import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import "./index.css";
import Home from "./pages/Home";
import { store } from "./store";
import firebase from "./firebase";
import reportWebVitals from "./reportWebVitals";
import Login from "./pages/Login";
import { NavBarComp } from "./components/NavBar";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import PrivateOutlet from "./routes";

// Firebase => Backend as a service
// ReactJS => Single page application
// npm => node package manager
// tailwindCss

const firebaseConfig = {
  userProfile: "users",
  profileParamsToPopulate: [
    { child: "role", root: "roles" }, // populates user's role with matching role object from roles
  ],
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
            <Route path="/" element={<NavBarComp />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="/dashboard" element={<PrivateOutlet />}>
                <Route index element={<Dashboard />} />
              </Route>
              <Route path="*" element={<NotFound />} />
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
reportWebVitals(console.log);
