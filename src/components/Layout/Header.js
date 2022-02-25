import React from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = () => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>At Erwi's House</h1>
        <HeaderCartButton />
      </header>
      <div>
        <img
          className={classes["main-image"]}
          src={mealsImage}
          alt="a table full of delicious food"
        />
      </div>
    </React.Fragment>
  );
};

export default Header;
