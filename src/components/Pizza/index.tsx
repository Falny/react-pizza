import React from "react";
import "./Pizza.scss";

import { useDispatch, useSelector } from "react-redux";
import { addCart, CartItem } from "../../redux/slices/cartSlice";

import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";

const diametr : number[] = [26, 30, 40]
const type: string[] = ["тонкое", "традиционное"];

type PizzaProps = {
  id: number;
  img: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  
};

export const Pizza : React.FC<PizzaProps> = ({ id, img, title, price, sizes, types }) => {
  
  const cartItem = useSelector((state: RootState) => state.cart.cart.find(obj => {
    console.log('MAIN AGAIN', obj.id, id, obj);
    return obj.id === id;
  }))
  console.log(cartItem)
  const cart = useSelector((state: RootState) => state.cart.cart)
  console.log(cart)
  const hasItemCart = cartItem ? cartItem.count : 0;

  const [choiceDiametr, setChoiceDiametr] = React.useState(0)
  const [choiceTypes, setChoiceTypes] = React.useState(0);

  

  const dispatch = useDispatch()

  const obj: CartItem = {
    id,
    title,
    price,
    img,
    type: type[choiceTypes],
    diametr: diametr[choiceDiametr],
    count: 0,
  };

  const onClickAdd = () => {
    
    dispatch(addCart(obj));
  }

  

  return (
    <>
      <div className="pizza">
        <Link to={`pizza/${id}`}>
          <img src={img} alt="" className="pizza-img" />
        </Link>
        <h3 className="pizza-title">{title}</h3>
        <div className="pizza-block">
          <ul className="pizza-type">
            {type.map((item, index) => (
              <li
                key={index}
                className={`pizza-type-item ${
                  choiceTypes === index && "active-pizza-parametr"
                } ${types.includes(index) ? "" : "inactive-parametr"}`}
                onClick={() => setChoiceTypes(index)}
              >
                {item}
              </li>
            ))}
          </ul>
          <ul className="pizza-diametr">
            {diametr.map((item, index) => (
              <li
                key={index}
                className={`pizza-diametr-item ${
                  choiceDiametr === index && "active-pizza-parametr"
                } ${sizes.includes(item) ? "" : "inactive-parametr"}`}
                onClick={() => setChoiceDiametr(index)}
              >
                {item} cm.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-info">
          <p className="pizza-price">от {price} P</p>
          <button className="pizza-add-cart" onClick={() => onClickAdd()}>
            <b className="pizza-add-plus">+</b> Добавить
            {hasItemCart > 0 && <span>{hasItemCart}</span>}
          </button>
        </div>
      </div>
    </>
  );
};
