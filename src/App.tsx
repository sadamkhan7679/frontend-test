import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
// import Pages
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { getAllUsers } from "./services/auth";
import RegisterPage from "./pages/register";

function App() {
  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      console.log("response: ", response);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      {/*<Link to="/login">Login</Link> | <Link to="/">Home</Link>*/}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <Counter />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.tsx</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <span>*/}
      {/*    <span>Learn </span>*/}
      {/*    <a*/}
      {/*      className="App-link"*/}
      {/*      href="https://reactjs.org/"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener noreferrer"*/}
      {/*    >*/}
      {/*      React*/}
      {/*    </a>*/}
      {/*    <span>, </span>*/}
      {/*    <a*/}
      {/*      className="App-link"*/}
      {/*      href="https://redux.js.org/"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener noreferrer"*/}
      {/*    >*/}
      {/*      Redux*/}
      {/*    </a>*/}
      {/*    <span>, </span>*/}
      {/*    <a*/}
      {/*      className="App-link"*/}
      {/*      href="https://redux-toolkit.js.org/"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener noreferrer"*/}
      {/*    >*/}
      {/*      Redux Toolkit*/}
      {/*    </a>*/}
      {/*    ,<span> and </span>*/}
      {/*    <a*/}
      {/*      className="App-link"*/}
      {/*      href="https://react-redux.js.org/"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener noreferrer"*/}
      {/*    >*/}
      {/*      React Redux*/}
      {/*    </a>*/}
      {/*  </span>*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
