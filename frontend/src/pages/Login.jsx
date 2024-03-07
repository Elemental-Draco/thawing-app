import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("successful login", data);
        navigate("/");
      } else {
        setError(data.error || "invalid login data");
      }
    } catch (error) {
      console.error("login error: ", error);
      setError("error logging in");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
<<<<<<< HEAD
      <form action="/login" method="post">
        <div class="form-control input" placeholder="Username"></div>
        <div class="form-control input" placeholder="Password" value=""></div>
=======
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="bg-danger">{error}</p>}
>>>>>>> b957ad87d5ce4f8315ab71e9caf46dfd1b7d3a57
      </form>
    </div>
  );
};

export default Login;
