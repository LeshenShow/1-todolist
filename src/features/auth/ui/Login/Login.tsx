import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useAppSelector } from "common/hooks";
import { Path } from "common/router";
import { getTheme } from "common/theme";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { selectIsLoggedIn, selectThemeMode } from "app/appSlice";
import { useLoginMutation } from "features/auth/api/authApi";
import type { LoginArgs } from "features/auth/api/authApi.types";
import { ResultCode } from "features/todolists/lib/enums";
import s from "./Login.module.css";
export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode);
  // const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [login, { error, isError }] = useLoginMutation();
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, touchedFields, isValid },
  } = useForm<LoginArgs>({
    defaultValues: { email: "", password: "", rememberMe: false },
  });
  const onSubmit: SubmitHandler<LoginArgs> = data => {
    // dispatch(loginTC({ data }));
    login(data).then(res => {
      if (res.data?.resultCode === ResultCode.Success) {
        localStorage.setItem("token", res.data.data.token);
        reset();
      }
    });
    // .finally(() => {
    //   reset();
    // });
    // navigate(Path.Main);
    // console.log(data);
  };
  if (isLoggedIn) {
    return <Navigate to={Path.Main} />;
  }
  return (
    <>
      {/* {isLoggedIn && <Navigate to={Path.Main} />} */}
      <Grid container justifyContent={"center"}>
        <Grid item justifyContent={"center"}>
          <FormControl>
            <FormLabel>
              <p>
                To login get registered
                <a
                  style={{
                    color: getTheme(themeMode).palette.primary.main,
                    marginLeft: "5px",
                  }}
                  href={"https://social-network.samuraijs.com/"}
                  target={"_blank"}
                  rel="noreferrer">
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>
                <b>Email:</b> free@samuraijs.com
              </p>
              <p>
                <b>Password:</b> free
              </p>
            </FormLabel>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <TextField
                  label="Email"
                  margin="normal"
                  {...register("email", {
                    required: { value: true, message: "Email field is required" },
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Incorrect email address",
                    },
                    maxLength: 20,
                    minLength: 1,
                  })}
                />
                {errors.email && (
                  <p className={s.errorMessage} role="alert">
                    {errors.email?.message}
                  </p>
                )}
                <TextField
                  type="password"
                  label="Password"
                  margin="normal"
                  {...register("password", {
                    required: { value: true, message: "Password field is required" },
                    minLength: 3,
                  })}
                />
                {errors.password && (
                  <p className={s.errorMessage} role="alert">
                    {errors.password?.message}
                  </p>
                )}
                <FormControlLabel
                  label={"Remember me"}
                  control={
                    <Controller
                      name={"rememberMe"}
                      control={control}
                      render={({ field: { value, ...field } }) => (
                        <Checkbox {...field} checked={value} />
                      )}
                    />
                  }
                />
                <Button
                  type={"submit"}
                  variant={"contained"}
                  color={"primary"}
                  disabled={!isValid}>
                  Login
                </Button>
              </FormGroup>
            </form>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};
