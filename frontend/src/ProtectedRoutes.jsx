import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch("/check-logged-in");
        if (!response.ok) {
          setIsLoggedIn(false);
          setLoading(false);
          console.log("not ok", isLoggedIn);
          throw new Error("User not valid");
        } else {
          setIsLoggedIn(true);
          setLoading(false);
          console.log("is ok", isLoggedIn);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setLoading(false);
        console.error(error);
      }
    };
    checkLoggedIn();
  }, [isLoggedIn]);

  console.log(isLoggedIn);
  if (loading) {
    return <div>Loading...</div>;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
