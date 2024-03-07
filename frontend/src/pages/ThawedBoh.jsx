import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FoodHolder from "../components/FoodHolder";

const ThawedBoh = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const retrieveFoodlist = async () => {
      try {
        const foodList = await fetch("/thawed-boh");
        const response = await foodList.json();
        setFoods(response);
        setLoading(false);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    retrieveFoodlist();
  }, [loading]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {foods.map((food) => (
            <FoodHolder food={food} key={food._id} />
          ))}
        </div>
      </div>
      <p>page renders something</p>
    </div>
  );
};

export default ThawedBoh;
