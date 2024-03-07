import React from "react";

const FoodHolder = (props) => {
  const { food } = props;
  return (
    <>
      <p>Food img</p>
      <p>{food.name}</p>
      <p>food count</p>
    </>
  );
};

export default FoodHolder;
