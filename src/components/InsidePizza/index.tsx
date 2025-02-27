import React from "react";
import "./InsidePizza.scss";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const InsidePizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    img: string,
    title: string
  }> ();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://67b9d43951192bd378de8d62.mockapi.io/Pizzas/" + id
        );

        setPizza(data);
      } catch {
        alert("Ошибка данных ");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);
  
  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <>
      <div className="inside-pizza">
        <img src={`/${pizza.img}`} alt="pizzaImg" />
        <h3>{pizza.title}</h3>
      </div>
    </>
  );
};
