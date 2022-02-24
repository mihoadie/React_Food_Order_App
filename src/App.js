import Header from "./components/Layout/Header";
import React, { useState } from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContext from "./store/cart-context";
const App = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const cartModalHandler = () => {
    setIsCartVisible((prevState) => {
      return !prevState;
    });
  };

  return (
    <React.Fragment>
      <CartContext.Provider
        value={{ isVisible: isCartVisible, showCartHandler: cartModalHandler }}
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
