import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h2>Home</h2>
      <ul>
        <li>
          {/* if user is a supervisor, let them see more buttons */}
          <Link to={"pull"}>Start Pull</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
