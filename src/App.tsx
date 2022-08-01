import React, { useEffect } from "react";
import logo from "./logo.svg";
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
    </div>
  );
}

export default App;
