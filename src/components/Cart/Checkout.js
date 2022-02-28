import React, { useContext, useRef, useState } from "react";
import classes from "./Checkout.module.css";
import CartContext from "../../store/cart-context";

function Checkout(props) {
  const ctx = useContext(CartContext);
  const [formInputs, setFormInputs] = useState({
    name: true,
    street: true,
    city: true,
    zipCode: true,
    completeForm: true,
  });
  const isEmpty = (value) => {
    return value.trim().length === 0;
  };
  const isFiveChars = (value) => {
    return value.trim().length === 5;
  };

  const enteredNameRef = useRef();
  const enteredStreetRef = useRef();
  const enteredZipCodeRef = useRef();
  const enteredCityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const nameIsValid = !isEmpty(enteredNameRef.current.value);
    const streetIsValid = !isEmpty(enteredStreetRef.current.value);
    const cityIsValid = !isEmpty(enteredCityRef.current.value);
    const zipCodeIsValid = isFiveChars(enteredZipCodeRef.current.value);
    const isFormValid =
      nameIsValid && streetIsValid && cityIsValid && zipCodeIsValid;

    if (!isFormValid) {
      setFormInputs({
        name: nameIsValid,
        street: streetIsValid,
        city: cityIsValid,
        zipCode: zipCodeIsValid,
        completeForm: isFormValid,
      });
      return;
    }
    props.onConfirmOrder({
      name: enteredNameRef.current.value,
      street: enteredStreetRef.current.value,
      city: enteredCityRef.current.value,
      zipCode: enteredZipCodeRef.current.value,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputs.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputs.street ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputs.city ? "" : classes.invalid
  }`;
  const zipCodeControlClasses = `${classes.control} ${
    formInputs.zipCode ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input id="name" type="text" ref={enteredNameRef}></input>
        {!formInputs.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={enteredStreetRef}></input>
        {!formInputs.street && <p>Please enter a valid street name</p>}
      </div>
      <div className={zipCodeControlClasses}>
        <label htmlFor="zipCode">zip Code</label>
        <input id="zipCode" type="text" ref={enteredZipCodeRef}></input>
        {!formInputs.zipCode && <p>Please enter a valid ZipCode (5 chars)</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={enteredCityRef}></input>
        {!formInputs.city && <p>Please enter a valid city name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={ctx.showCartHandler}>
          Cancel
        </button>
        {/* we put type="button" here so that they is no confusion with implicit type="submit" */}
        <button type="submit" className={classes.submit}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default Checkout;
