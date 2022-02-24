import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const MealItem = (props) => {
  const price = `$$$  ${props.price.toFixed(2)}`; // it provides $$$ 15.85 for ex   as it will round to 2 decimals with the toFixed(2) JS function
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
