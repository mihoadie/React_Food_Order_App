import React, { useContext, useState, useEffect } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "./../Cart/CartIcon";
import CartContext from "../../store/cart-context";
const HeaderCartButton = () => {
  const ctx = useContext(CartContext);

  const [cartMovement, setCartMovement] = useState(false);

  const btnClasses = `${classes.button} ${cartMovement ? classes.bump : ""}`;

  const numberOfMealsSelected = ctx.cartItems.reduce((currentCount, item) => {
    return currentCount + item.amount;
  }, 0);

  useEffect(() => {
    if (ctx.cartItems.length === 0) {
      return;
    }
    setCartMovement(true);
    const timer = setTimeout(() => {
      setCartMovement(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [ctx.cartItems]);

  return (
    <button className={btnClasses} onClick={ctx.showCartHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfMealsSelected}</span>
    </button>
  );
};

export default HeaderCartButton;
