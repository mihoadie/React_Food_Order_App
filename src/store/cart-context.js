import React from "react";

const CartContext = React.createContext({
  isVisible: false,
  showCartHandler: () => {},
});
export default CartContext;
