import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  selectIsAuthenticated,
  selectStatus,
  selectUser,
} from "../app/slices/AuthSlice";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  // Selectors
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const navigate = useNavigate();

  console.log("useAuth", isAuthenticated, user, status);

  const dispatch = useDispatch();

  const handleLogin = (token: string, user: User) => {
    dispatch(login({ token, user }));
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    user,
    status,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
