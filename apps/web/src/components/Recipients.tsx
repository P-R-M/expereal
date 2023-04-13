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
      </div>

      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Chats: Loading...</span>}
      
      {snapshot &&
        snapshot.docs.map(
          (group, idx) =>
            group.data().patrons.includes(user?.uid) && ( // checks if user is member of the group chat
              <div
                id={`${idx}`}
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
                  <div className="ml-2 text-sm font-semibold">{group.data().name}</div>
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
      </div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Chats: Loading...</span>}
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        {chats &&
          chats.docs.map((chat, idx) => (
            <button
              id={`${idx}`}
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              onClick={() => {
                setUID(chat.id);
                setCollName("privateChats");
              }}
            >
              <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                {chat.data().patron[0]}
              </div>
              <div className="ml-2 text-sm font-semibold">{chat.data().patron}</div>
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
      <GroupChats setUID={setUID} setCollName={setCollName}/>
    </div>
  );
}

export default Recipients;
