import React, { useState } from "react";
import ProfileDisplay from "../components/ProfileDisplay";
import ProfileEdit from "../components/ProfileEdit";

function Profile() {
  const [edit, setEdit] = useState(false);

  const handleEdit = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setEdit(!edit);
  };

  return (
    <>
      {!edit && <ProfileDisplay handleEdit={handleEdit} />}

      {edit && <ProfileEdit handleEdit={handleEdit}/>}
    </>
  );
}

export default Profile;
