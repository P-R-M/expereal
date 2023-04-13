import React, { useRef } from "react";
import ChatForm from "../components/ChatForm";
import ChatRoom from "../components/ChatRoom";
import Recipients from "../components/Recipients";
import ChatProfile from "../components/ChatProfile";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore as db} from "../firebase";

// https://tailwindcomponents.com/component/quickchat-chat-layout

// All of them within the scheduled time
// private chats
// group chats

// Advisor must create schedules

function Dashboard() {
  const dummy = useRef<HTMLSpanElement>(null);
  const [uid, setUID] = React.useState<string>();
  const [collName, setCollName] = React.useState<string>();

  const msgsRef = collection(db, `${collName}/${uid}/messages`);
  const q = query(msgsRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(q);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl">ExpChat</div>
          </div>
          <ChatProfile />
          <Recipients setUID={setUID} setCollName={setCollName} />
        </div>
        <div className="flex flex-col flex-auto p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 p-4">
            {!!uid ? (
              <>
                <ChatRoom messages={messages} dummy={dummy} />
                <ChatForm dummy={dummy} collRef={msgsRef} />
              </>
            ) : (
              <span>Click on a chat to see content</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
