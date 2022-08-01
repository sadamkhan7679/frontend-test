import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface Props extends ButtonProps {
  children: React.ReactNode;
}

const AppButton: React.FC<Props> = ({ children, ...otherProps }) => {
  return (
    <Button variant="contained" {...otherProps}>
      {children}
    </Button>
  );
};

export default AppButton;
