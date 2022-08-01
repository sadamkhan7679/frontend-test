import React from "react";
import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import AppContainer from "../../common/Container";
import AppPaper from "../../common/Paper";
import FormInput from "../../common/FormElements/input";
import AppButton from "../../common/Button";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";

interface RegisterProps {
  username: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const initialValues: RegisterProps = {
  username: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterProps>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const register = async (data: RegisterProps) => {
    console.log("user", data);
    try {
      const res = await registerUser({
        username: data.username,
        password: data.password,
      });
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContainer className={styles.container}>
      <AppPaper className={styles.wrapper}>
        <h1 className="text-center">Register</h1>
        <form onSubmit={handleSubmit(register)}>
          <FormInput
            name={"username"}
            control={control}
            placeholder="Please enter your username"
            label="Username"
            sx={{ mb: 2 }}
          />
          <FormInput
            name={"password"}
            control={control}
            placeholder="Please enter your password"
            label="Password"
            type="password"
            sx={{ mb: 2 }}
          />
          <FormInput
            name={"confirmPassword"}
            control={control}
            placeholder="Please confirm your password"
            label="Confirm Password"
            type="password"
            sx={{ mb: 2 }}
          />
          <AppButton type="submit" sx={{ mb: 2 }}>
            Connect
          </AppButton>
        </form>
        <Typography variant="body2">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </AppPaper>
    </AppContainer>
  );
};

export default RegisterPage;
