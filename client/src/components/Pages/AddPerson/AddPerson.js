import React, { useState } from "react";
import "./AddPerson.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import logo from "../../../image/personal-information.png";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddPerson = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(true);
  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(true);
  const [dataIsValid, setDataIsValid] = useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const setUserNameHandler = (e) => {
    const username = e.target.value;

    setValidUsername(true);

    for (var i = 0; i < username.length; i++) {
      var char1 = username.charAt(i);
      var cc = char1.charCodeAt(0);

      if (
        ((cc > 47 && cc < 58) ||
          (cc > 64 && cc < 91) ||
          (cc > 96 && cc < 123)) &&
        !e.target.value.includes(" ")
      ) {
      } else {
        setValidUsername(false);
      }
    }

    setUsername(e.target.value);
  };
  const setEmailHandler = (e) => {
    setValidEmail(true);
    if (!e.target.value.includes("@")) {
      setValidEmail(false);
    }
    setEmail(e.target.value);
  };
  const setPhoneHandler = (e) => {
    setValidPhone(true);
    if (
      e.target.value.length !== 10 ||
      e.target.value.includes(" ")
    )
      setValidPhone(false);
    setPhone(e.target.value);
  };
  const setAddressHandler = (e) => {
    setValidAddress(true);
    for (var i = 0; i < e.target.value.length; i++) {
      var char1 = e.target.value.charAt(i);
      var cc = char1.charCodeAt(0);

      if (cc > 0) {
      } else {
        setValidAddress(false);
      }
    }

    setAddress(e.target.value);
  };

  const submitHandler = async () => {
    console.log(username + " " + email + " " + phone + " " + address);

    try {
      if (username && email && phone && address && phone.length === 10) {
        const res = await fetch("https://companyassignments.herokuapp.com/persons", {
          method: "POST",
          body: JSON.stringify({ username, email, mobile: phone, address }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        setDataIsValid(true);
      } else {
        setDataIsValid(false);
      }
    } catch (err) {
      console.log(err);
    }
    handleClick();
    cancelHandler();
  };
  const cancelHandler = () => {
    setUsername("");
    setEmail("");
    setPhone("");
    setAddress("");
    setValidUsername(true);
    setValidAddress(true);
    setValidPhone(true);
    setValidEmail(true);
  };

  const ShowMessage = (severity,message) =>{
    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={`${severity}`} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
    );
  }

  return (
    <div className="add-person-body">
      {dataIsValid && (
        ShowMessage('success','User added successfully!')
      )}
      {!dataIsValid && (
        ShowMessage('error','Data you have entered not valid!')
      )}
      <div className="add-person-container">
        <div className="add-person-content">
          <div className="add-person-logo">
            <img
              className="add-person-logo"
              src={logo}
              alt="personal details"
            />
          </div>
          <div className="username inputs">
            <label className="add-person-label">Username</label>
            <input
              value={username}
              className={`add-person-input ${
                validUsername ? "valid" : "invalid"
              }`}
              onChange={setUserNameHandler}
              placeholder="Enter your alphanumeric username"
              type="text"
            />
          </div>
          <div className="email inputs">
            <label className="add-person-label">Email</label>
            <input
              value={email}
              className={`add-person-input ${validEmail ? "valid" : "invalid"}`}
              onChange={setEmailHandler}
              placeholder="Enter your email"
              type="text"
            />
          </div>
          <div className="number inputs">
            <label className="add-person-label">Phone number</label>
            <input
              value={phone}
              className={`add-person-input ${validPhone ? "valid" : "invalid"}`}
              onChange={setPhoneHandler}
              placeholder="Enter your phone number"
              type="text"
            />
          </div>
          <div className="address inputs">
            <label className="add-person-label">Address</label>
            <input
              value={address}
              className={`add-person-input ${
                validAddress ? "valid" : "invalid"
              }`}
              onChange={setAddressHandler}
              placeholder="Enter your address"
              type="text"
            />
          </div>
          <div className="submit-cancel__button">
            <button
              type="button"
              data-toggle="modal"
              data-target="#exampleModal"
              className="button submit btn btn-primary"
              onClick={submitHandler}
            >
              Submit
            </button>
            <button className="button cancel" onClick={cancelHandler}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPerson;
