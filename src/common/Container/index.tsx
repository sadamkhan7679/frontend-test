import React from "react";
import { Container, ContainerProps } from "@mui/material";

interface Props extends ContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<Props> = ({ children, ...otherProps }) => {
  return <Container {...otherProps}>{children}</Container>;
};

export default AppContainer;
