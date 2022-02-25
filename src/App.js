import Header from "./components/Layout/Header";
import React, { useState, useReducer } from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContext from "./store/cart-context";
import { cartReducer, defaultIndividualCartList } from "./store/cart-reducer";

const App = () => {
  // ################ STEP 1: TO MANAGE IF CART SHOULD BE VISIBLE OR NOT
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartModalHandler = () => {
    setIsCartVisible((prevState) => {
      return !prevState;
    });
  };

  // ################ STEP 2: TO MANAGE MODIFICATION INTO THE CART
  const [IndividualCartList, dispatchIndividualCartList] = useReducer(
    cartReducer,
    defaultIndividualCartList
  );
  const removeItemFromCart = (id) => {
    dispatchIndividualCartList({ type: "CART_REMOVE_ITEM", id: id });
  };
  const addItemToCart = (payload) => {
    dispatchIndividualCartList({ type: "CART_INCREMENT", payload: payload });
  };

  return (
    <React.Fragment>
      <CartContext.Provider
        value={{
          isVisible: isCartVisible,
          showCartHandler: cartModalHandler,
          addCartItem: addItemToCart,
          removeCartItem: removeItemFromCart,
          cartItems: IndividualCartList.items,
          totalAmount: IndividualCartList.totalAmount,
        }}
      >
        {isCartVisible && <Cart />}
        <Header />
        <main>
          <Meals />
        </main>
      </CartContext.Provider>
    </React.Fragment>
  );
};

export default App;
