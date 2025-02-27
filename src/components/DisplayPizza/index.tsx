import React from "react";
import "./DisplayPizza.scss";

import { Pizza } from "../Pizza";
import { Skeletons } from "./Skeletons";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const DisplayPizza = () => {

  const { pizzas, status } = useSelector((state: RootState) => state.pizza);

  return (
    <>
      <h3 className='display-title'>Все пиццы</h3>
      <ul className="wrapper-pizza">
        {status === 'loading' ? [...Array(8)].map((_, index) => <Skeletons key={ index} />) : pizzas.map((item) => <Pizza key={item.id} {...item} />)}
      </ul>
    </>
  );
};
