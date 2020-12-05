import React from "react";
import "./App.css";

function App() {
  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
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
    console.log(response.status);
    // return response.json(); // parses JSON response into native JavaScript objects
  }
  // function postData(url: string, data: object) {
  //   let response = fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: { "Content-type": "application/json; charset=UTF-8" },
  //   })
  //     .then((res) => {
  //       res.json();
  //     })
  //     .then((data) => {
  //       console.log("data: ", data);
  //       return data;
  //     })
  //     .catch((err) => {
  //       console.log("error: ", err);
  //     });
  //   console.log("ending response: ", response);
  // }

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
  return (
    <div className="App">
      <h1>Hello World</h1>
      <button onClick={handleAddUser}>Add User</button>
      <label>
        <input type="text" onChange={handleChange} />
      </label>
    </div>
  );
}

export default App;
