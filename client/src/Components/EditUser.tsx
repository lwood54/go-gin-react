import React, { useState } from "react";
import styled from "styled-components";

import { User, UserAction, Promise, EditUserResponse } from "../Types/User";
import { Actions, UserField, URLPaths, DefaultUser } from "../Constants/Constants";

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

function EditUser({ userAction }: UserAction) {
  const [userData, setUserData] = useState<User>(DefaultUser);

  function handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    switch (e.target.name) {
      case UserField.ID_INPUT:
        if (parseInt(val)) {
          console.log(parseInt(val));
          let idInput = parseInt(val, 10);
          setUserData({ ...userData, id: idInput });
        }
        break;
      case UserField.LAST_NAME:
        if (typeof val === "string") {
          setUserData({ ...userData, lastName: val });
        }
        break;
      case UserField.FIRST_NAME:
        if (typeof val === "string") {
          setUserData({ ...userData, firstName: val });
        }
        break;
      case UserField.EMAIL:
        if (typeof val === "string") {
          setUserData({ ...userData, email: val });
        }
        break;
      case UserField.PHONE:
        if (typeof val === "string") {
          setUserData({ ...userData, phone: val });
        }
        break;
      case UserField.PASSWORD:
        if (typeof val === "string") {
          setUserData({ ...userData, password: val });
        }
        break;

      default:
        break;
    }
  }

  const handleAddUser = () => {
    const isBlankList: Array<undefined | number | string> = [];
    for (const [i, v] of Object.entries(userData)) {
      if (v === "" || v === undefined) {
        isBlankList.push(i);
      }
    }
    if (isBlankList.length <= 0) {
      const postUser: Promise = async () => {
        const response = await fetch(URLPaths.API_USER, {
          method: "POST",
          body: JSON.stringify(userData),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        const resultData: EditUserResponse = await response.json();
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
    const updateUser: Promise = async () => {
      const response = await fetch(`${URLPaths.API_USER}${userData.id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const responseData: EditUserResponse = await response.json();
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
      const response = await fetch(`${URLPaths.API_USER}${userData.id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const resMessage: EditUserResponse = await response.json();
      console.log("delete response: ", resMessage);
    };
    try {
      deleteUser();
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const handleLogin = () => {
    // can I just send data object of login info
    // when should I encrypt password, unsafe to pass actual password in header?
    // const loginData = { email: userData.email, password: userData.password };
    const login: Promise = async () => {
      const response = await fetch(`${URLPaths.API_LOGIN}${userData.email}/${userData.password}`, {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const resMessage: EditUserResponse = await response.json();
      console.log("login response: ", resMessage);
    };
    try {
      login();
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const handleUserAction = () => {
    switch (userAction) {
      case Actions.ADD:
        handleAddUser();
        break;
      case Actions.UPDATE:
        handleUpdateUser();
        break;
      case Actions.DELETE:
        handleDeleteUser();
        break;
      default:
        handleLogin();
        break;
    }
  };

  return (
    <ContainerSC>
      <FormItemSC>
        <label>
          Email
          <input type="text" name={UserField.EMAIL} onChange={handleUserInput} />
        </label>
      </FormItemSC>
      <FormItemSC>
        <label>
          Password
          <input type="text" name={UserField.PASSWORD} onChange={handleUserInput} />
        </label>
      </FormItemSC>
      {userAction === Actions.LOGIN ? null : (
        <>
          <FormItemSC>
            <label>
              ID
              <input type="text" name={UserField.ID_INPUT} onChange={handleUserInput} />
            </label>
          </FormItemSC>
          <FormItemSC>
            <label>
              Last Name
              <input type="text" name={UserField.LAST_NAME} onChange={handleUserInput} />
            </label>
          </FormItemSC>
          <FormItemSC>
            <label>
              First Name
              <input type="text" name={UserField.FIRST_NAME} onChange={handleUserInput} />
            </label>
          </FormItemSC>

          <FormItemSC>
            <label>
              Phone
              <input type="text" name={UserField.PHONE} onChange={handleUserInput} />
            </label>
          </FormItemSC>
        </>
      )}

      <FormItemSC>
        <button onClick={handleUserAction}>Submit</button>
      </FormItemSC>
    </ContainerSC>
  );
}

export default EditUser;
