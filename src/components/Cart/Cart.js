import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = () => {
  const ctx = useContext(CartContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.cartItems.length > 0;
  const cartItemRemoveHandler = (id) => {
    ctx.removeCartItem(id);
  };
  const cartItemAddHandler = (item) => {
    ctx.addCartItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.cartItems.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={ctx.showCartHandler}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={ctx.showCartHandler}
        >
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={ctx.showCartHandler}>
            Order!
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
