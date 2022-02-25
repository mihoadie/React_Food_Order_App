import React from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Erwi' Sushi Box",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Erwi's freezy Bier",
    description: "A german specialty!",
    price: 6.5,
  },
  {
    id: "m3",
    name: "Erwi's Vegan Burger",
    description: "Like an American!",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 14.99,
  },
  {
    id: "m5",
    name: "Erwi's Sugar Pie",
    description: "like a Pie..thon developer",
    price: 14.99,
  },
  {
    id: "m6",
    name: "Erwi's Cigare",
    description: "Smoky...and tasty... ",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
    ></MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
