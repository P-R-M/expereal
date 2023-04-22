import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { doc } from "firebase/firestore";

const ChatProfile = () => {
  const [user] = useAuthState(auth);

  const docRef = doc(db, "profile", user!.uid);
  const [prof] = useDocumentData(docRef);

  return (
    <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
      <div className="h-20 w-20 rounded-full border overflow-hidden">
        <img
          src="https://avatars3.githubusercontent.com/u/2763884?s=128"
          alt="Avatar"
          className="h-full w-full"
        />
      </div>
      <div
        className={`text-sm font-semibold mt-2 ${
          !prof?.displayName && "text-red-800"
        }`}
      >
        @{!!prof?.displayName ? prof?.displayName : "Complete your profile"}
      </div>
      <div className="text-xs text-gray-500">
        {prof?.role} - {prof?.title}
      </div>
      <div className="flex flex-row items-center mt-3">
        <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
          <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
        </div>
        <div className="leading-none ml-1 text-xs">Active</div>
      </div>
    </div>
  );
};

export default ChatProfile;
