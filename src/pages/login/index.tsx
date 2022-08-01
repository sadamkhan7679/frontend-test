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
import { Link } from "react-router-dom";
import { loginUser } from "../../services/auth";
import useAuth from "../../hooks/useAuth";

interface LoginProps {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues: LoginProps = {
  username: "",
  password: "",
};

const LoginPage: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const { handleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const login = async (data: LoginProps) => {
    console.log("user", data);
    setError(null);
    try {
      const res = await loginUser(data);
      console.log("res", res);
      if (res.status === 200) {
        console.log("success");
        const { user, token } = res.body;
        handleLogin(token, user);
      } else {
        setError(res.body.error);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <AppContainer className={styles.container}>
      <AppPaper className={styles.wrapper}>
        <h1 className="text-center">Login</h1>
        <form onSubmit={handleSubmit(login)}>
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
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <AppButton type="submit" sx={{ mb: 2 }}>
            Connect
          </AppButton>
        </form>
        <Typography variant="body2">
          New User? <Link to="/register">Register</Link>
        </Typography>
      </AppPaper>
    </AppContainer>
  );
};

export default LoginPage;
