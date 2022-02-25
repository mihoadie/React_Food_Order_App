import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const price = `$$$  ${props.price.toFixed(2)}`; // it provides $$$ 15.85 for ex   as it will round to 2 decimals with the toFixed(2) JS function
  const ctx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    const newItem = {
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      amount: amount,
    };
    ctx.addCartItem(newItem);
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
