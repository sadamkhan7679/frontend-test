import React from "react";
import Paper from "@mui/material/Paper";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const AppPaper: React.FC<Props> = ({ children, className, ...otherProps }) => {
  return (
    <Paper className={`${styles.wrapper} ${className}`} {...otherProps}>
      {children}
    </Paper>
  );
};

export default AppPaper;
