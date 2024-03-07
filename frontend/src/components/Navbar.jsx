import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Navbar = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  async function handleLogout() {
    try {
      await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      setLoggedOut(true);
    } catch (error) {
      console.error(error);
    }
  }
  if (loggedOut) {
    return <Navigate to="/login" />;
  }
  return (
    <nav>
      <p>Logo</p>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
