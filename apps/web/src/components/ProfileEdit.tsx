import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useSearchParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import useInput from "../hooks/useInput";

function ProfileEdit(props: {
  handleEdit: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const [searchParams] = useSearchParams();
  const [alert, setAlert] = React.useState("");
  const uid = searchParams.get("q");

  const docRef = doc(db, "profile", `${uid}`);
  const [prof, loading] = useDocumentData(docRef);

  const fName = useInput(prof?.firstName);
  const lName = useInput(prof?.lastName);
  const dName = useInput(prof?.displayName);
  const university = useInput(prof?.university);
  const title = useInput(prof?.title);
  const summary = useInput(prof?.summary);

  if (loading) {
    return <>loading...</>;
  }

  function registerWithEmailPassword(
    event: React.FormEvent<HTMLFormElement>
  ): void {
    event.preventDefault();
    const docRef = doc(db, "profile", `${uid}`);

    const data = {
      firstName: !!fName.value ? fName.value : prof?.firstName,
      lastName: !!lName.value ? lName.value : prof?.lastName,
      displayName: !!dName.value ? dName.value : prof?.displayName,
      university: !!university.value ? university.value : prof?.university,
      title: !!title.value ? title.value : prof?.title,
      summary: !!summary.value ? summary.value : prof?.summary,
    };

    updateDoc(docRef, data)
      .then(() => {
        setAlert("Your profile has been update");
        props.handleEdit();
      })
      .catch((error) => {
        setAlert(error.message);
      });
  }

  return (
    <div className="h-screen overflow-hidden flex justify-center">
      <main className="profile-page">
        <section className="relative bg-blueGray-200">
          <div className=" ">
            <div className="">
              <div className="flex min-h-full items-center justify-center">
                <div>
                  <div>
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                      Edit profile
                    </h2>
                  </div>
                  {alert && (
                    <span className="text-center text-green-700">{alert}</span>
                  )}
                  <form
                    className="mt-8 space-y-6"
                    onSubmit={registerWithEmailPassword}
                  >
                    <div className="-space-y-px w-full rounded-md shadow-sm">
                      <div className="w-full">
                        <label htmlFor="fName" className="sr-only">
                          FirstName
                        </label>
                        <input
                          id="fName"
                          name="fName"
                          type="text"
                          className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder={
                            !!prof?.firstName ? prof?.firstName : "First name"
                          }
                          {...fName}
                        />
                      </div>
                      <div>
                        <label htmlFor="lName" className="sr-only">
                          Last Name
                        </label>
                        <input
                          id="lName"
                          name="lName"
                          type="text"
                          className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder={
                            !!prof?.lastName ? prof?.lastName : "Last name"
                          }
                          {...lName}
                        />
                      </div>
                    </div>

                    <div className="-space-y-px w-full rounded-md shadow-sm">
                      <div className="w-full">
                        <label htmlFor="dName" className="sr-only">
                          Display Name
                        </label>
                        <input
                          id="dName"
                          name="dName"
                          type="text"
                          className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder={
                            !!prof?.displayName
                              ? prof?.displayName
                              : "Display Name"
                          }
                          {...dName}
                        />
                      </div>
                      <div>
                        <label htmlFor="title" className="sr-only">
                          Title
                        </label>
                        <input
                          id="title"
                          name="title"
                          type="text"
                          className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder={
                            !!prof?.title
                              ? prof?.title
                              : "e.g PhD Computer Science"
                          }
                          {...title}
                        />
                      </div>
                    </div>

                    <div className="-space-y-px w-full rounded-md shadow-sm">
                      <div className="w-full">
                        <label htmlFor="university" className="sr-only">
                          University
                        </label>
                        <input
                          id="university"
                          name="university"
                          type="text"
                          className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder={
                            !!prof?.university ? prof?.university : "University"
                          }
                          {...university}
                        />
                      </div>
                      <div>
                        <label htmlFor="summary" className="sr-only">
                          Summary
                        </label>
                        <input
                          id="summary"
                          name="summary"
                          type="text"
                          className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder={
                            !!prof?.summary ? prof?.summary : "Summary"
                          }
                          {...summary}
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
                              fill-rule="evenodd"
                              d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                        Save
                      </button>
                    </div>
                  </form>

                  <div>
                    <button
                      onClick={props.handleEdit}
                      className="group mt-8 relative flex w-full justify-center rounded-md text-indigo-600 border px-3 py-2 text-sm font-semibold hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                          className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfileEdit;
