import React from "react";
import { DocumentData } from "firebase/firestore";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// Backend as a Service
// Single page application
type ChatRoomProps = {
  dummy: React.RefObject<HTMLSpanElement>;
  messages: DocumentData[] | undefined;
};

function ChatRoom({ messages, dummy }: ChatRoomProps) {
  const [user] = useAuthState(auth);

  const meCss = [
    "relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl",
    "col-start-6 col-end-13 p-3 rounded-lg",
    "flex items-center justify-start flex-row-reverse",
  ];
  const senderCss = [
    "relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl",
    "col-start-1 col-end-8 p-3 rounded-lg",
    "flex flex-row items-center",
  ];

  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="flex flex-col">
        <div className="grid grid-cols-12 gap-y-2">
          {messages &&
            messages.map((message, idx) => (
              <div
                key={`${idx}`}
                className={`${
                  user?.uid === message.uid ? meCss[1] : senderCss[1]
                }`}
              >
                <div
                  className={`${
                    user?.uid === message.uid ? meCss[2] : senderCss[2]
                  }`}
                >
                  <div className="flex text-white items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    {message.initials}
                  </div>
                  <div
                    className={`${
                      user?.uid === message.uid ? meCss[0] : senderCss[0]
                    }`}
                  >
                    <div>{message.text}</div>
                    <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                      {/* {message.createdAt.toDate().toLocaleTimeString('en-US')} */}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <span ref={dummy}></span>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
