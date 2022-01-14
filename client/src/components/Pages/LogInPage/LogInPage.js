import React, { useState } from "react";
import "./LogInPage.css";
import login_logo from "../../../image/login.png";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LogInPage = (props) => {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(props.admin.token);
  const [valid, setValid] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(props.admin);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };
  const getEmail = (e) => {
    setEmail(e.target.value);
  };
  //props.expire ||
  const submitHandler = () => {
    if (
      props.admin.password === password &&
      props.admin.email === email &&
      props.token
    ) {
      const tokenExpirationDate = new Date(new Date().getTime() + 5000);
      localStorage.setItem(
        "token",
        JSON.stringify({
          token: props.token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
      props.getStatus(true);
    } else {
      setValid(false);
      setOpen(true);
      props.getStatus(false);
    }
  };
  const cancelHandler = () => {
    setPassword("");
    setEmail("");
  };

  const ShowMessage = (severity, message) => {
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={`${severity}`}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <div className="login-page-body">
      {!valid && ShowMessage("error", "Please insert valid email or password")}
      <div className="login-page-container">
        <div className="login-page-content">
          <img style={{ width: "100px" }} src={login_logo} alt="login" />
          <div className="login-page-fields">
            <div className="login-page-email login-page-field">
              <label className="login-page-label">Email</label>
              <input
                type={"email"}
                className="login-page-input"
                onChange={getEmail}
                placeholder="Enter your email"
              />
            </div>
            <div className="login-page-password login-page-field">
              <label className="login-page-label">password</label>
              <input
                type={"password"}
                className="login-page-input"
                onChange={getPassword}
                placeholder="Enter your password"
              />
            </div>
            <div className="login-page-buttons">
              <button
                onClick={submitHandler}
                className="login-page-button login-page-submit"
              >
                Log In
              </button>
              <button
                onClick={cancelHandler}
                className="login-page-button login-page-cancel"
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
