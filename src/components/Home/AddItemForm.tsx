import React, { useCallback } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { ListItem } from "../../types/ListItem";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormInput from "../../common/FormElements/input";
import { useDropzone } from "react-dropzone";
import ImageIcon from "@mui/icons-material/Image";
import AppButton from "../../common/Button";
import { createListItem } from "../../services/listItems";

interface Props {
  open: boolean;
  handleClose: () => void;
  addNewItem: (item: ListItem) => void;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  picture: yup.string().required("Picture is required"),
});

const initialValues: ListItem = {
  title: "",
  description: "",
  picture: "",
};

const AddItem: React.FC<Props> = ({ open, handleClose, addNewItem }) => {
  const [picture, setPicture] = React.useState<string | null>(null);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ListItem>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    const file = acceptedFiles[0];

    const url = URL.createObjectURL(file);
    setValue("picture", url);
    setPicture(url);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFormSubmit = async (data: ListItem) => {
    console.log("formData", data);

    try {
      const res = await createListItem(data);
      console.log("add item", res);
      addNewItem(res.listItems);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const pictureError = errors.picture;

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent dividers>
        <form>
          <FormInput
            control={control}
            name="title"
            placeholder="Please enter your title"
            label="Title"
            sx={{ mb: 2 }}
          />
          <FormInput
            control={control}
            name="description"
            placeholder="Please enter your description"
            label="Description"
            sx={{ mb: 2 }}
          />
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {!isDragActive ? (
              !picture ? (
                <ImageIcon
                  color="primary"
                  sx={{
                    width: "150px",
                    height: "150px",
                  }}
                />
              ) : (
                <img
                  src={picture}
                  width="150px"
                  height="150px"
                  alt="file upload"
                />
              )
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
          {pictureError && <p>{pictureError.message}</p>}
        </form>
      </DialogContent>
      <DialogActions>
        <AppButton color="error" onClick={handleClose}>
          Cancel
        </AppButton>
        <AppButton onClick={handleSubmit(handleFormSubmit)}>Save</AppButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddItem;
