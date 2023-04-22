import React from "react";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore as db } from "../firebase";

const GroupChats = () => {
  // read from collection group where has been approved
  const [user] = useAuthState(auth);

  const groupsRef = collection(db, "groupChats");
  const q = query(groupsRef, orderBy("initials"), limit(5));

  const [groups] = useCollectionData(q);

  return (
    <>
      <div className="flex flex-row items-center justify-between text-xs mt-6">
        <span className="font-bold">Group Chats</span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          {groups?.length}
        </span>
      </div>
      {groups &&
        groups.map(
          (group, idx) =>
            group.patrons.includes(user?.uid) && ( // checks if user is member of the group chat
              <div id={`${idx}`} className="flex flex-col space-y-1 mt-4 -mx-2">
                <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    {group.initials}
                  </div>
                  <div className="ml-2 text-sm font-semibold">{group.name}</div>
                </button>
              </div>
            )
        )}
    </>
  );
};

const PrivateChats = () => {
  // read from private chats collection

  const chatRef = collection(db, "privateChats");
  const q = query(chatRef, limit(25));

  const [chats] = useCollectionData(q);

  return (
    <>
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Private Chats</span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          {chats?.length}
        </span>
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        {chats?.length &&
          chats.map((chat, idx) => (
            <button id={`${idx}`} className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                {chat?.patron[0]}
              </div>
              <div className="ml-2 text-sm font-semibold">{chat?.patron}</div>
            </button>
          ))}
      </div>
    </>
  );
};

function Recipients() {
  return (
    <div className="flex flex-col mt-8">
      <PrivateChats />
      <GroupChats />
    </div>
  );
}

export default Recipients;
