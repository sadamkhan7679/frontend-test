import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

type Props = {
  name: string;
  control: any;
} & TextFieldProps;

const FormInput: React.FC<Props> = ({ control, name, ...otherProps }) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({
        field,
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <TextField
          {...field}
          error={!!error}
          helperText={error ? error.message : ""}
          fullWidth
          type="text"
          {...otherProps}
        />
      )}
    />
  );
};

export default FormInput;
