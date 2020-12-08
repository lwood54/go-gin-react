import React, { useState } from "react";

function AddUser() {
  const [createId, setCreateId] = useState<number>();
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
    const isBlankList: any[] = [];
    for (const [i, v] of Object.entries(data)) {
      if (v === "" || v === undefined) {
        isBlankList.push(i);
      }
    }
    if (isBlankList.length <= 0) {
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
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default AddUser;
