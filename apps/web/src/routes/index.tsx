import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase";

function PrivateOutlet() {
    const [user] = useAuthState(auth);
  return !!user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateOutlet;
