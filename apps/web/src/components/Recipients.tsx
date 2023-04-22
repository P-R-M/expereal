import React, { Dispatch, SetStateAction } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  doc,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import GroupModel from "./GroupModel";
import SearchModel from "./SearchModel";

type ChatsProps = {
  setUID: Dispatch<SetStateAction<string | undefined>>;
  setCollName: Dispatch<SetStateAction<string | undefined>>;
};

const GroupChats = ({ setUID, setCollName }: ChatsProps) => {
  // read from collection group where has been approved
  const [user] = useAuthState(auth);
  const [toggle, setToggle] = React.useState(false);

  const groupsRef = collection(db, "groupChats");
  const q = query(groupsRef, orderBy("initials"), limit(5));
  const [snapshot, loading, error] = useCollection(q);

  const docRef = doc(db, "profile", user!.uid);
  const [prof] = useDocumentData(docRef);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between text-xs mt-6">
        <span className="font-bold">Group Chats</span>
        <div className="flex flex-row items-center">
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            {snapshot !== undefined && snapshot.docs !== undefined
              ? snapshot.docs.filter((d) =>
                  d.data().patrons.includes(user?.uid)
                ).length
              : 0}
          </span>
          {prof?.role === "Advisor" && (
            <span
              onClick={handleToggle}
              className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full ml-5 hover:bg-gray-500 hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="50px"
                height="50px"
              >
                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z" />
              </svg>
            </span>
          )}
        </div>
      </div>

      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Chats: Loading...</span>}

      {snapshot !== undefined &&
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

      {snapshot !== undefined && snapshot?.empty && prof?.role === "Advisor" ? (
        <span className="text-sm text-center text-gray-500">
          Click on the "+" icon to create a group chat.
        </span>
      ) : (
        <span className="text-sm text-center text-gray-500">
          Chat with an Advisor so that you can be added to a group chat.
        </span>
      )}

      <GroupModel open={toggle} handleToggle={handleToggle} />
    </>
  );
};

const PrivateChats = ({ setUID, setCollName }: ChatsProps) => {
  // read from private chats collection
  const [user] = useAuthState(auth);
  const [toggleOpen, setToggleOpen] = React.useState(false);
  const [searchQ, setSearchQ] = React.useState("");
  const [queryResults, setQueryResult] =
    React.useState<QueryDocumentSnapshot<DocumentData>[]>();

  const chatRef = collection(db, "privateChats");
  const q = query(chatRef, limit(25));
  const [chats, loading, error] = useCollection(q);

  const docRef = doc(db, "profile", user!.uid);
  const [prof] = useDocumentData(docRef);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const chatRef = collection(db, "profile");
    const q = query(chatRef);

    const querySnapshot = await getDocs(q);

    setQueryResult(
      querySnapshot.docs.filter((doc_) => {
        return (
          (doc_.data()?.firstName as string)
            ?.toLowerCase()
            ?.includes(searchQ.toLowerCase()) ||
          (doc_.data()?.lastName as string)
            ?.toLowerCase()
            ?.includes(searchQ.toLowerCase()) ||
          (doc_.data()?.displayName as string)
            ?.toLowerCase()
            ?.includes(searchQ.toLowerCase()) ||
          (doc_.data()?.summary as string)
            ?.toLowerCase()
            ?.includes(searchQ.toLowerCase()) ||
          (doc_.data()?.title as string)
            ?.toLowerCase()
            ?.includes(searchQ.toLowerCase()) ||
          (doc_.data()?.university as string)
            ?.toLowerCase()
            ?.includes(searchQ.toLowerCase())
        );
      })
    );
  };

  const handleSearchToggle = () => {
    setToggleOpen(!toggleOpen);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQ(event.target.value);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Private Chats</span>
        <div className="flex flex-row items-center">
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            {chats !== undefined && chats.docs !== undefined
              ? chats.docs.filter((d) =>
                  [d.data().advisorId, d.data().patronId].includes(user?.uid)
                ).length
              : 0}
          </span>
          {prof?.role === "Patron" && (
            <span
              onClick={handleSearchToggle}
              className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full ml-5 hover:bg-gray-500 hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="50px"
                height="50px"
              >
                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z" />
              </svg>
            </span>
          )}
        </div>
      </div>

      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Chats: Loading...</span>}

      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        {chats !== undefined &&
          chats.docs.map(
            (chat, idx) =>
              [chat.data().advisorId, chat.data().patronId].includes(
                user?.uid
              ) && (
                <button
                  key={`${idx}`}
                  className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                  onClick={() => {
                    setUID(chat.id);
                    setCollName("privateChats");
                  }}
                >
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    {prof?.role === "Patron"
                      ? chat.data().patron[0]
                      : chat.data().advisor[0]}
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {prof?.role === "Patron"
                      ? chat.data().patron
                      : chat.data().advisor}
                  </div>
                </button>
              )
          )}

        {chats !== undefined && chats?.empty && prof?.role === "Advisor" ? (
          <span className="text-sm text-center text-gray-500">
            Wait for a patron to contact you.
          </span>
        ) : (
          <span className="text-sm text-center text-gray-500">
            Click on the "+" icon to search for an advisor.
          </span>
        )}

        {
          <SearchModel
            open={toggleOpen}
            handleToggle={handleSearchToggle}
            value={searchQ}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            queryResults={queryResults}
          />
        }
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
