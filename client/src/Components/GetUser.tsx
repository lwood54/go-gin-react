import React, { useState } from "react";

function GetUser() {
  const [getId, setGetId] = useState<number>();

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
    <div>
      <label>
        <input type="text" name="id" onChange={handleIdInput} value={getId === 0 ? "" : getId} />
      </label>
      <button onClick={handleGetUser}>Find user</button>
    </div>
  );
}

export default GetUser;
