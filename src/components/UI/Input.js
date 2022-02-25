import React from "react";
import classes from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} id={props.input.id} {...props.input} />
      {/* {...props.input}  is a special trick that insures us that all other props coming from the props object named 'input' 
      (for example if props.input has more than one simple key value pair "id:__" )... WILL be integrated automatically  */}
    </div>
  );
});

export default Input;
