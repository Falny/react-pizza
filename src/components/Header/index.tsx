import React from "react";
import "./Header.scss";

import { Link, useLocation } from "react-router-dom";

import { Search } from "../Search";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const Header: React.FC = () => {

  const { cart } = useSelector((state: RootState) => state.cart)
  const location = useLocation()

  const isMount = React.useRef(false);

  React.useEffect(() => {
      if (isMount) {
        
        localStorage.setItem("cart", JSON.stringify(cart));
      }
  
      isMount.current = true;
    }, [cart]);

  return (
    <>
      <div className="header">
        <Link to="/" className="header-left">
          <img src="/assets/pizza-logo.svg" className="header-logo" />
          <div className="header-name">
            <h2>Pizza</h2>
            <p>Самая вкусная пицца на всей земле</p>
          </div>
        </Link>
        <Search />
        {location.pathname !== "/cart" && (
          <Link to="/cart" className="header-right">
            <p>{cart.reduce((sum, value) => sum + (value.price * value.count), 0)} p</p>
            <div className="header-cart">
              <img src="/assets/cart-icon.svg" className="header-cart-icon" />
              <p>{cart.reduce((sum, value) => sum + value.count, 0)}</p>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};
