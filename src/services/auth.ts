import { User } from "../types";

export const getAllUsers = async () => {
  const response = await fetch("/api/users");
  const users = await response.json();
  return users;
};

export const registerUser = async (params: User) => {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data;
};

export const loginUser = async (params: User) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();

  console.log("data", data);

  return data;
};
