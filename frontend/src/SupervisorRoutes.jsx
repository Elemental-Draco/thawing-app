import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const SupervisorRoutes = () => {
  const [isSupervisor, setIsSupervisor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch("/check-supervisor");
        if (!response.ok) {
          setIsSupervisor(false);
          setLoading(false);
          setMessage("You don't have access to that page");
          console.log(message);
          throw new Error("User not valid");
        } else {
          setIsSupervisor(true);
          setLoading(false);
          setMessage("");
        }
      } catch (error) {
        setIsSupervisor(false);
        setLoading(false);
        setMessage("Something went wrong while checking for authentication");
      }
    };
    checkLoggedIn();
  }, [isSupervisor, message]);
  const params = { message: message };

  console.log(isSupervisor);
  if (loading) {
    return <div>Loading...</div>;
  }
  return isSupervisor ? <Outlet /> : <Navigate to="/" state={params} />;
};

export default SupervisorRoutes;
