import React from "react";

const CartContext = React.createContext({
  isVisible: false,
  showCartHandler: () => {},
  cartItems: [],
  totalAmount: 0,
  addCartItem: (item) => {},
  removeCartItem: (id) => {},
  resetCart: () => {},
});
export default CartContext;
