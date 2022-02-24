import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const cartItems = (
    <ul className={classes["class-item"]}>
      {[{ id: "C1", name: "sushi", amount: 2, price: 12.99 }].map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal onClick={ctx.showCartHandler}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={ctx.showCartHandler}
        >
          Close
        </button>
        <button className={classes.button} onClick={ctx.showCartHandler}>
          Order!
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
