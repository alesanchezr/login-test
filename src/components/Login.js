import axios from "axios";
import React, { useState } from "react";
import "./login.css";

export const Login = () => {
  const [formStatus, setFormStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email: email,
        password: password
      });

      setToken(response.data.token);
      setFormStatus("success");
      setMessage(`Redirecting with token ${token}...`);
    } catch (error) {
      console.log("response ", error.response);
      if (error.response.status === 400) {
        setFormStatus("danger");
        setMessage(error.response.data.error);
      } else {
        setFormStatus("danger");
        setMessage("Impossible to login without those credentials");
      }
    }
  };

  return (
    <div className="wrapper">
      {formStatus && (
        <div className={`alert alert-${formStatus}`}>{message}</div>
      )}
      <form className="form-signin" onSubmit={(e) => loginUser(e)}>
        <h2 className="form-signin-heading">Please login</h2>
        <input
          type="text"
          className="form-control"
          name="email"
          placeholder="Email Address"
          required=""
          autofocus=""
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          required=""
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
