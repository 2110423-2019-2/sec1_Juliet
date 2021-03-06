import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import userImage from "../component/UserImage";
import { MyLink } from "../component/MyTitle";
import ConfirmModal from "../component/ConfirmModal";
import backend from "../ip";
const useStyles = makeStyles({
  root: {
    color: "#777777",
    marginBottom: 20,
  },
  input: {
    display: "none",
  },
  label: {
    border: "1px dashed #BDBDBD",
    color: "#BDBDBD",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100px",
    width: "100px",
  },
});

const Register = ({ history, handleLogin }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    firstname: null,
    lastname: null,
    username: null,
    password: null,
    email: null,
    phone_number: null,
  });
  const [error, setError] = useState({
    firstname: false,
    lastname: false,
    username: false,
    password: false,
    email: false,
    phone_number: false,
  });

  const validate = () => {
    setError({
      firstname: !form.firstname,
      lastname: !form.lastname,
      username: !form.username,
      password: !form.password,
      email: !form.email,
      phone_number: !form.phone_number,
    });
    return !(
      error.firstname ||
      error.lastname ||
      error.username ||
      error.password ||
      error.email ||
      error.departure_latitude ||
      error.phone_number
    );
  };

  const handleRegister = async () => {
    if (validate()) {
      try {
        const response = await axios.post(backend + "/user/register", {
          ...form,
          photo: userImage,
        });
        const { success, information, message } = response.data;
        if (success) {
          const user = information[0];
          handleLogin(user);
          history.push("/");
        } else {
          setErrorMessage(message);
        }
      } catch (e) {
        console.log(e);
        setErrorMessage("Invalid data, please check your input again");
      }
    }
  };

  const classes = useStyles();

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      justifyContent="center"
    >
      <h1 style={{ marginBottom: 10 }}> Hello,</h1>
      <Box
        color="palette.secondary.main"
        style={{ color: "#CE7B91", marginBottom: "40px" }}
      >
        Sign Up
      </Box>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <div style={{ marginBottom: 5 }}>FIRST NAME</div>
        <Input
          fullWidth
          placeholder="First Name"
          className={classes.root}
          value={form.firstname}
          error={error.firstname}
          onChange={(e) => setForm({ ...form, firstname: e.target.value })}
        />

        <div style={{ marginBottom: 5 }}>LAST NAME</div>
        <Input
          fullWidth
          placeholder="Last Name"
          className={classes.root}
          value={form.lastname}
          error={error.lastname}
          onChange={(e) => setForm({ ...form, lastname: e.target.value })}
        />

        <div style={{ marginBottom: 5 }}>USERNAME</div>
        <Input
          fullWidth
          placeholder="Username"
          className={classes.root}
          value={form.username}
          error={error.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <div style={{ marginBottom: 5 }}>PASSWORD</div>
        <Input
          placeholder="Password"
          className={classes.root}
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          error={error.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />

        <div style={{ marginBottom: 5 }}>EMAIL</div>
        <Input
          fullWidth
          placeholder="Email"
          className={classes.root}
          value={form.email}
          error={error.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div style={{ marginBottom: 5 }}>PHONE NUMBER</div>
        <Input
          fullWidth
          placeholder="Phone Number"
          className={classes.root}
          value={form.phone_number}
          error={error.phone_number}
          onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
        />
      </Grid>
      <div style={{ marginTop: 32 }}>
        <ConfirmModal
          onConfirm={handleRegister}
          btn="1"
          action="Sign Up"
          message="Are you sure you want to sing up with this information ?"
          confirm="OK"
          cancel="Cancel"
        />
      </div>
      {errorMessage !== "" && (
        <div style={{ color: "red" }}>{errorMessage}</div>
      )}
      <MyLink
        goto="/login"
        style={{
          marginTop: 25,
          alignSelf: "center",
          color: "#bdbdbd",
          fontSize: 16,
        }}
      >
        Already a member ?
      </MyLink>
    </Grid>
  );
};

export default withRouter(Register);
