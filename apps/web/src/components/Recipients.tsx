import React, { Dispatch, SetStateAction } from "react";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore as db } from "../firebase";

type ChatsProps = {
  setUID: Dispatch<SetStateAction<string | undefined>>;
  setCollName: Dispatch<SetStateAction<string | undefined>>;
};

const GroupChats = ({ setUID, setCollName }: ChatsProps) => {
  // read from collection group where has been approved
  const [user] = useAuthState(auth);

  const groupsRef = collection(db, "groupChats");
  const q = query(groupsRef, orderBy("initials"), limit(5));
  const [snapshot, loading, error] = useCollection(q);

  return (
    <>
      <div className="flex flex-row items-center justify-between text-xs mt-6">
        <span className="font-bold">Group Chats</span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          {snapshot?.docs?.length}
        </span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
          >
            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z" />
          </svg>
        </span>
      </div>

      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Chats: Loading...</span>}

      {snapshot &&
        snapshot.docs.map(
          (group, idx) =>
            group.data().patrons.includes(user?.uid) && ( // checks if user is member of the group chat
              <div
                key={`${idx}`}
                onClick={() => {
                  setUID(group.id);
                  setCollName("groupChats");
                }}
                className="flex flex-col space-y-1 mt-4 -mx-2"
              >
                <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    {group.data().initials}
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {group.data().name}
                  </div>
                </button>
              </div>
            )
        )}
    </>
  );
};

const PrivateChats = ({ setUID, setCollName }: ChatsProps) => {
  // read from private chats collection

  const chatRef = collection(db, "privateChats");
  const q = query(chatRef, limit(25));

  const [chats, loading, error] = useCollection(q);

  return (
    <>
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Private Chats</span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          {chats?.docs?.length}
        </span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
          >
            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z" />
          </svg>
        </span>
      </div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Chats: Loading...</span>}
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        {chats &&
          chats.docs.map((chat, idx) => (
            <button
              key={`${idx}`}
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              onClick={() => {
                setUID(chat.id);
                setCollName("privateChats");
              }}
            >
              <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                {chat.data().patron[0]}
              </div>
              <div className="ml-2 text-sm font-semibold">
                {chat.data().patron}
              </div>
            </button>
          ))}
      </div>
    </>
  );
};

function Recipients({ setUID, setCollName }: ChatsProps) {
  return (
    <div className="flex flex-col mt-8">
      <PrivateChats setUID={setUID} setCollName={setCollName} />
      <GroupChats setUID={setUID} setCollName={setCollName} />
    </div>
  );
}

export default Recipients;
