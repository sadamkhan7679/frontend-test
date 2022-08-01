import React, { useEffect } from "react";
import ItemsList from "../../components/Home/ItemsList";
import AppContainer from "../../common/Container";
import AppPaper from "../../common/Paper";
import { Box } from "@mui/material";
import AppButton from "../../common/Button";
import AddItem from "../../components/Home/AddItemForm";
import { ListItem } from "../../types/ListItem";
import { getAllListItems } from "../../services/listItems";

interface Props {}

const HomePage: React.FC<Props> = () => {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<ListItem[]>([]);

  const getListItems = async () => {
    try {
      const res = await getAllListItems();
      console.log("list items", res);
      setItems(res.listItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListItems();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const addNewItem = (item: ListItem) => {
    setItems([...items, item]);
  };

  return (
    <AppContainer>
      <AppPaper>
        <h1>Home</h1>
        <ItemsList items={items} />
        <AddItem
          open={open}
          handleClose={handleClose}
          addNewItem={addNewItem}
        />
        <Box mt={5}>
          <AppButton onClick={handleOpen}>Create New</AppButton>
        </Box>
      </AppPaper>
    </AppContainer>
  );
};

export default HomePage;
