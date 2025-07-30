import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setUser } from "../../redux/slices/user-slice";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../handlers/AlertProvider";
import { useValidation } from "../../handlers/ValidationProvider";

const LoginCard: React.FC = (): ReactElement => {
  const userlogger = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { showAlert } = useAlert(); // Get showAlert function from useAlert
  const { validateField, formErrors } = useValidation();

  // Login Api Call
  const handleSumbit = (event: any) => {
    event.preventDefault();
    const apiURL = `${process.env.REACT_APP_API_BASE_URL}/api/users/api/login`;
    if (!email || !password) {
      showAlert("error", "Please Enter All the fields");
    } else {
      axios
        .post(apiURL, { email: email, password: password })
        .then((response) => {
          dispatch(setUser(response.data.data.token));
          localStorage.setItem("loggedUser", response.data.data.token.userId);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          showAlert("error", "Invalid Email or Password. Please try again"); // Show alert(error.response.data.message);
        });
    }
  };

  const showUser = () => {
    if (userlogger.userId) {
      showAlert(
        "success",
        "Login Successful, Welcome " +
          userlogger.firstName +
          " " +
          userlogger.lastName
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item>
            <Typography variant="h4">Login </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value, true); // Validate email field
              }}
              error={!!formErrors.email} // Highlight error if present
              helperText={formErrors.email} // Display error message
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              sx={{ marginBottom: 1 }}
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></TextField>
            <br />
            <Link alignSelf="center" className="hoverHand">
              {" "}
              Forgot Password?
            </Link>
          </Grid>
          <Grid item>
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              {" "}
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default LoginCard;
