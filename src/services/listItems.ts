import { ListItem } from "../types/ListItem";

export const getAllListItems = async () => {
  const response = await fetch("/api/list-items");
  const listItems = await response.json();
  return listItems;
};

// Create new list item
export const createListItem = async (params: ListItem) => {
  const response = await fetch("/api/list-items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data;
};
