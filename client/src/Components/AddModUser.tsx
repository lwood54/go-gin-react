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
  interface User {
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    password: string;
  }

  interface AddResponse {
    message: string;
    user: User;
  }

  type Promise = () => void;

  const handleAddUser = () => {
    const data = {
      id: createId,
      lastName,
      firstName,
      email,
      phone,
      password,
    };
    const isBlankList: Array<undefined | number | string> = [];
    for (const [i, v] of Object.entries(data)) {
      if (v === "" || v === undefined) {
        isBlankList.push(i);
      }
    }
    if (isBlankList.length <= 0) {
      const postUser: Promise = async () => {
        const response = await fetch("/api/user", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        const resultData: AddResponse = await response.json();
        console.log("resultData in addUser: ", resultData);
      };
      try {
        postUser();
      } catch (error) {
        console.log("ERROR: ", error);
      }
    }
  };

  const handleUpdateUser = () => {
    const data = {
      id: createId,
      lastName,
      firstName,
      email,
      phone,
      password,
    };

    const updateUser: Promise = async () => {
      const response = await fetch(`/api/user/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const responseData: AddResponse = await response.json();
      console.log("update response: ", responseData);
    };
    try {
      updateUser();
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const handleDeleteUser = () => {
    const deleteUser: Promise = async () => {
      const response = await fetch(`/api/user/${createId}`, {
        method: "DELETE",
        // body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const resMessage = await response.json();
      console.log("delete response: ", resMessage);
    };
    try {
      deleteUser();
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const handleUserAction = () => {
    switch (userAction) {
      case "add":
        handleAddUser();
        break;
      case "update":
        handleUpdateUser();
        break;
      case "delete":
        handleDeleteUser();
        break;
      default:
        break;
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
      {userAction === "delete" ? null : (
        <>
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
        </>
      )}

      <FormItemSC>
        <button onClick={handleUserAction}>{userAction}</button>
      </FormItemSC>
    </ContainerSC>
  );
}

export default AddModUser;
