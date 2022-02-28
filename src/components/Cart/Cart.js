import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = () => {
  const ctx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // to manage validaiton of the cart and the associated fetch
  const [error, setError] = useState(null);
  const [didSubmit, setDidSubmit] = useState(false);
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

  const orderHandler = () => {
    setIsCheckout(true);
    // console.log("youpi");
    // ctx.showCartHandler();
  };

  const submitOrderHandler = async (userData) => {
    setDidSubmit(false);
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-food-9e268-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({ user: userData, orderItems: ctx.cartItems }),
        }
      );
      if (!response.ok) {
        throw new Error("could not validate you order - error in request");
      }
      setIsSubmitting(false);
      setDidSubmit(true);
    } catch (error) {
      setError(error.message);
      setIsSubmitting(false);
    }
    //  ctx.showCartHandler();
    ctx.resetCart();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={ctx.showCartHandler}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order!
        </button>
      )}
    </div>
  );

  const carModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirmOrder={submitOrderHandler} />}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingContent = <p>Sending Order Data...</p>;
  const didSubmitContent = (
    <React.Fragment>
      <p>Successfully submitted your order...</p>{" "}
      <div className={classes.actions}>
        <button className={classes.button} onClick={ctx.showCartHandler}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClick={ctx.showCartHandler}>
      {!isSubmitting && !didSubmit && carModalContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmitContent}
      {!isSubmitting && error !== null && (
        <React.Fragment>
          <p>{error}...</p>{" "}
          <div className={classes.actions}>
            <button className={classes.button} onClick={ctx.showCartHandler}>
              Close
            </button>
          </div>
        </React.Fragment>
      )}
    </Modal>
  );
};

export default Cart;
