import React, { useState } from "react";

import Home from "./Components/Home";
import LoggedIn from "./Components/LoggedIn";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return <div className="App">{loggedIn ? <LoggedIn /> : <Home />}</div>;
}

export default App;
