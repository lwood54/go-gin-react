import React, { useState } from "react";

function App() {
  const [getId, setGetId] = useState<number>();
  const [createId, setCreateId] = useState<number>();
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // eslint-disable-next-line
  function newID(): number {
    let randomID = Math.floor(Math.random() * 10000);
    return randomID;
  }

  const handleAddUser = () => {
    const data = {
      id: createId,
      lastName,
      firstName,
      email,
      phone,
      password,
    };
    console.log("data: ", data);
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  function handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    switch (e.target.name) {
      case "idInput":
        if (parseInt(val)) {
          console.log(parseInt(val));
          let id = parseInt(val, 10);
          setCreateId(id);
        }
        break;
      case "lastName":
        if (typeof val === "string") {
          setLastName(val);
        }
        break;
      case "firstName":
        if (typeof val === "string") {
          setFirstName(val);
        }
        break;
      case "email":
        if (typeof val === "string") {
          setEmail(val);
        }
        break;
      case "phone":
        if (typeof val === "string") {
          setPhone(val);
        }
        break;
      case "password":
        if (typeof val === "string") {
          setPassword(val);
        }
        break;

      default:
        break;
    }
  }

  const handleGetUser = () => {
    if (getId) {
      fetch(`/api/user/${getId}`)
        .then((response) => response.json())
        .then((data) => console.log(data));
      setGetId(undefined);
    }
  };
  const handleIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let id: number;
    if (parseInt(e.target.value)) {
      console.log(parseInt(e.target.value));
      id = parseInt(e.target.value, 10);
      setGetId(id);
    } else {
      setGetId(0);
    }
  };
  return (
    <div className="App">
      <h1>Hello World</h1>

      <label>
        ID
        <input type="text" name="idInput" onChange={handleUserInput} />
      </label>
      <label>
        Last Name
        <input type="text" name="lastName" onChange={handleUserInput} />
      </label>
      <label>
        First Name
        <input type="text" name="firstName" onChange={handleUserInput} />
      </label>
      <label>
        Email
        <input type="text" name="email" onChange={handleUserInput} />
      </label>
      <label>
        Phone
        <input type="text" name="phone" onChange={handleUserInput} />
      </label>
      <label>
        Password
        <input type="text" name="password" onChange={handleUserInput} />
      </label>
      <button onClick={handleAddUser}>Add User</button>

      <label>
        <input type="text" name="id" onChange={handleIdInput} value={getId === 0 ? "" : getId} />
      </label>
      <button onClick={handleGetUser}>Find user</button>
    </div>
  );
}

export default App;
