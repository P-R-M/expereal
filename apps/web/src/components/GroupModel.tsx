import React from "react";
import useInput from "../hooks/useInput";
import { Timestamp, addDoc, collection, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

const GroupModel = (props: { open: boolean; handleToggle: () => void }) => {
  const { open, handleToggle } = props;

  const groupName = useInput("");
  const initials = useInput("");
  const [user] = useAuthState(auth);

  const docRef = doc(db, "profile", user!.uid);
  const [prof] = useDocumentData(docRef);

  const groupRef = collection(db, `groupChats`);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const uid = user?.uid;

    await addDoc(groupRef, {
      name: groupName.value,
      initials: initials.value,
      advisor: prof?.displayName,
      patrons: [uid],
      createdAt: Timestamp.now(),
    });

    handleToggle();
  };

  return (
    <div
      className={`relative z-10 ${open ? "" : "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-300 bg-opacity-50 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div>
                <div className="mt-3 text-center">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Create a group chat
                  </h3>
                  <div className="mt-2">
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                      <input type="hidden" name="remember" value="true" />
                      <div className="-space-y-px w-full rounded-md shadow-sm">
                        <div>
                          <label htmlFor="group_name" className="sr-only">
                            Group name
                          </label>
                          <input
                            id="group_name"
                            name="group_name"
                            type="text"
                            required
                            className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Group name. ex: Artificial Intelligence"
                            {...groupName}
                          />
                        </div>
                        <div>
                          <label htmlFor="initials" className="sr-only">
                            Initials
                          </label>
                          <input
                            id="initials"
                            name="initials"
                            type="text"
                            required
                            className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Group initials. ex: AI"
                            {...initials}
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg
                              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupModel;
