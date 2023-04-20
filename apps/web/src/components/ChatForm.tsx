import React from "react";
import {
  CollectionReference,
  DocumentData,
  Timestamp,
  addDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

type ChatFormProps = {
  dummy: React.RefObject<HTMLSpanElement>;
  collRef: CollectionReference<DocumentData>;
};

function ChatForm({ dummy, collRef }: ChatFormProps) {
  const [user] = useAuthState(auth);
  const [formValue, setFormValue] = React.useState("");

  const docRef = doc(db, "profile", `${user?.uid}`);
  const [prof] = useDocumentData(docRef);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const uid = user?.uid;
    const initials = user!.displayName;

    await addDoc(collRef, {
      text: formValue,
      createdAt: Timestamp.now(),
      uid,
      initials: initials?.at(0),
    });

    setFormValue("");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  };

  function handleToggle(
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <form
      onSubmit={sendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div>
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
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="ml-4">
        <button
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
          disabled={!formValue}
        >
          <span>Send</span>
          <span className="ml-2">
            <svg
              className="w-4 h-4 transform rotate-45 -mt-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}

export default ChatForm;
