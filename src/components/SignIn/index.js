import React, { useState } from "react";
import Auth from "./../Auth";
import { useAuth } from "./../../util/auth.js";
import "./styles.scss";

function SignIn(props) {
  const auth = useAuth();
  const [status, setStatus] = useState();

  const onSubmit = ({ login, pass }) => {
    setStatus({ type: "pending" });
    auth
      .signin(login, pass)
      .then(user => {
        props.onSignin && props.onSignin();
      })
      .catch(error => {
        setStatus({
          type: "error",
          message: error.message
        });
      });
  };

  return (
    <Auth
      mode="signin"
      buttonText={props.buttonText}
      parentColor={props.parentColor}
      onSubmit={onSubmit}
      status={status}
    />
  );
}

export default SignIn;
