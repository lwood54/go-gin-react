import React, { useState } from "react";

import EditUser from "./EditUser";
import GetUser from "./GetUser";

function Home() {
  const [userAction, setUserAction] = useState<string>("add");

  function handleAction(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserAction(e.target.value);
  }

  return (
    <div>
      <h1>Welcome to Bills Tracker</h1>
      <h3>Action</h3>
      <select name="useraction" onChange={handleAction}>
        <option value="add">Add User</option>
        <option value="update">Update User</option>
        <option value="delete">Delete User</option>
      </select>
      <EditUser userAction={userAction} />
      <GetUser />
    </div>
  );
}

export default Home;
