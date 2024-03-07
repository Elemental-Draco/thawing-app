import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "./Layout";

const Home = () => {
  let message;
  const location = useLocation();

  const params = location.state;

  if (params) {
    message = params.message;
  }
  return (
    <Layout>
      <div className="home">
        <h2>Home</h2>
        {message ? <div>{message}</div> : <></>}
        <ul>
          <li>
            {/* all buttons visible, but depending on what role the user is, some buttons will be greyed out */}
            <Link to="/thawed-boh">Start Pull</Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
