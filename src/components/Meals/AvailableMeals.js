import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // as the useEffect is with [] dependancie, it will be lauched when this component is created. thus, at the beginning, we set isLoading to true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-food-9e268-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Http request error while fetching");
      }
      const responseData = await response.json();
      if (
        !responseData ||
        responseData === null ||
        responseData === undefined
      ) {
        throw new Error("Http request error while fetching");
      }
      const loadedMealsList = [];
      for (const key in responseData) {
        loadedMealsList.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMealsList);
      setIsLoading(false);
      setError(null);
    };

    fetchMeals().catch((errors) => {
      setError(errors.message);
      setIsLoading(false);
    });
    // we cannot encapsulated fetchMeals with try catch {} beacuase we would then need to tipe: try {await fetchMeals()} catch(error{setError(error.message); setIsLoading(false)})
    //but doing so, with await in front of fetchMeals, would mean that we have to put async in useEffect when declaring fetchMeals. and it is not allowed!!!
    // so we go with the fetchMeasl().catch()!
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading ...</p>
      </section>
    );
  }
  if (error !== null) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
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
