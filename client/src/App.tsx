import React from "react";

import AddUser from "./Components/AddUser";
import GetUser from "./Components/GetUser";

function App() {
  return (
    <div className="App">
      <h1>To Do Tree</h1>
      <AddUser />
      <GetUser />
    </div>
  );
}

export default App;
