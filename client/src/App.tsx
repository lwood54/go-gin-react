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
      <h1>To Do Tree</h1>
      <h3>Action</h3>
      <select name="useraction" onChange={handleAction}>
        <option value="add">add new user</option>
        <option value="update"> update user</option>
      </select>
      <AddModUser userAction={userAction} />
      <GetUser />
    </div>
  );
}

export default App;
