import React from "react";
import "./App.css";

function App() {
  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "no-cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const handleAddUser = () => {
    postData("http://localhost:5000/api/user", {
      Id: 10000,
      Name: "Amrynn",
      Email: "zzz@888.com",
      Phone: "123-456-7899",
      Address: "111 Fountain Dr",
    }).then((data) => {
      console.log("posting? ", data); // JSON data parsed by `data.json()` call
    });
  };
  return (
    <div className="App">
      <h1>Hello World</h1>
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}

export default App;
