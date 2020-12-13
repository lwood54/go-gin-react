import React, { useState } from "react";

import EditUser from "./EditUser";
// import GetUser from "./GetUser";

import { Actions } from "../Constants/Constants";

function Home() {
  const [userAction, setUserAction] = useState<string>(Actions.LOGIN);

  function handleAction(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserAction(e.target.value);
  }

  return (
    <div>
      <h1>Welcome to Bills Tracker</h1>
      <h3>Action</h3>
      <select name="useraction" onChange={handleAction}>
        <option value={Actions.LOGIN}>Login</option>
        <option value={Actions.ADD}>Create Account</option>
        <option value={Actions.UPDATE}>Update Account</option>
        <option value={Actions.DELETE}>Delete Account</option>
      </select>
      <EditUser userAction={userAction} />
      {/* <GetUser /> */}
    </div>
  );
}

export default Home;
