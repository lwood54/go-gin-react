import React, { useState } from "react";
import styled from "styled-components";

import { UserAction } from "../Types/User";

const ContainerSC: React.FC = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const FormItemSC: React.FC = styled.div`
  width: 100%;
`;

function AddModUser({ userAction }: UserAction) {
  const [createId, setCreateId] = useState<number>();
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  console.log(userAction);

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
    const isBlankList: Array<undefined | number | string> = [];
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
    <ContainerSC>
      <FormItemSC>
        <label>
          ID
          <input type="text" name="idInput" onChange={handleUserInput} />
        </label>
      </FormItemSC>
      <FormItemSC>
        <label>
          Last Name
          <input type="text" name="lastName" onChange={handleUserInput} />
        </label>
      </FormItemSC>
      <FormItemSC>
        <label>
          First Name
          <input type="text" name="firstName" onChange={handleUserInput} />
        </label>
      </FormItemSC>
      <FormItemSC>
        <label>
          Email
          <input type="text" name="email" onChange={handleUserInput} />
        </label>
      </FormItemSC>
      <FormItemSC>
        <label>
          Phone
          <input type="text" name="phone" onChange={handleUserInput} />
        </label>
      </FormItemSC>
      <FormItemSC>
        <label>
          Password
          <input type="text" name="password" onChange={handleUserInput} />
        </label>
      </FormItemSC>
      <button onClick={handleAddUser}>Add User</button>
    </ContainerSC>
  );
}

export default AddModUser;
