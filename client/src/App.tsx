import React, { useState } from "react";

import AddModUser from "./Components/AddModUser";
import GetUser from "./Components/GetUser";

function App() {
  const [userAction, setUserAction] = useState<string>("add");

  function handleAction(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserAction(e.target.value);
  }
  return (
    <div className="App">
      <h1>Bills Tracker</h1>
      <h3>Action</h3>
      <select name="useraction" onChange={handleAction}>
        <option value="add">Add User</option>
        <option value="update">Update User</option>
        <option value="delete">Delete User</option>
      </select>
      <AddModUser userAction={userAction} />
      <GetUser />
    </div>
  );
}

export default App;
