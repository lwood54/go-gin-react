import React, { useState } from "react";
import "./App.css";

function App() {
  const [id, setId] = useState<number>(0);
  function postData(url: string, data: object) {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.log("error: ", err);
      });
  }

  function newID(): number {
    let randomID = Math.floor(Math.random() * 10000);
    return randomID;
  }

  function handleChange() {
    console.log("handling change");
  }

  const handleAddUser = () => {
    postData("/api/user", {
      id: newID(),
      name: "Logan",
      email: "123@abc.com",
      phone: "123-456-7890",
      address: "54 Walk This Way",
    });
  };
  const handleGetUser = () => {
    fetch(`/api/user/${id}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  const handleIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let id = parseInt(e.target.value, 10);
    setId(id);
  };
  return (
    <div className="App">
      <h1>Hello World</h1>
      <button onClick={handleAddUser}>Add User</button>
      <label>
        <input type="text" onChange={handleChange} />
      </label>
      <button onClick={handleGetUser}>get user</button>
      <label>
        <input type="text" name="id" onChange={handleIdInput} />
      </label>
    </div>
  );
}

export default App;
