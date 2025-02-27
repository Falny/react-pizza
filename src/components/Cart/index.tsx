import React from "react";
import "./Cart.scss";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  removeItem,
  plusItem,
  minusItem,
} from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";

export const Cart: React.FC = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  console.log(cart);

  const dispatch = useDispatch();

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      {cart.length > 0 ? (
        <div className="cart">
          <div className="cart-head">
            <div className="cart-head-title">
              <img src="/assets/cart-icon-black.svg" alt="cart-icon" />
              <h3>Корзина</h3>
            </div>
            <div
              className="cart-head-trash"
              onClick={() => dispatch(clearCart())}
            >
              <img src="/assets/trash.svg" alt="" />
              <p>Очистить корзину</p>
            </div>
          </div>
          <ul className="cart-list">
            {cart.map((item) => (
              <li className="cart-item" key={item.id}>
                <div className="cart-left">
                  <img src={item.img} alt="" className="cart-img" />
                  <div className="cart-info">
                    <h3 className="cart-title">{item.title}</h3>
                    <p className="cart-text">{`${item.type} тесто, ${item.diametr} cm.`}</p>
                  </div>
                </div>
                <div className="cart-right">
                  <div className="cart-count">
                    <button
                      className="cart-btn cart-desc"
                      onClick={() => dispatch(minusItem(item.id))}
                    >
                      -
                    </button>
                    <p>{item.count}</p>
                    <button
                      className="cart-btn cart-inc"
                      onClick={() => dispatch(plusItem(item.id))}
                    >
                      +
                    </button>
                  </div>
                  <h3 className="cart-price">{item.price * item.count} p.</h3>
                  <button
                    className="cart-btn item-del"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-all">
            <p className="cart-pizza">
              Всего пицц:
              <span>
                {cart.reduce((sum, value) => sum + value.count, 0)} шт.
              </span>
            </p>
            <div className="cart-total">
              Сумма заказа:
              <span>
                {cart.reduce(
                  (sum, value) => sum + value.price * value.count,
                  0
                )} P
              </span>
            </div>
          </div>
          <div className="cart-btn">
            <Link to="/" className="cart-common-bnt btn-back">
              <img src="assets/path.svg" alt="arrow" />
              Вернуться назад
            </Link>
            <button type="button" className="cart-common-bnt btn-pay">
              Оплатить сейчас
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <h3 className="empty-cart-title">Корзина пустая 😕</h3>
          <p className="emty-cart-text">
            Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы
            заказать пиццу, перейди на главную страницу.
          </p>
          <img src="assets/empty-cart.png" alt="" className="empty-cart-img" />
          <Link to="/" className="empty-cart-btn" onClick={handleScrollUp}>
            Вернуться назад
          </Link>
        </div>
      )}
    </>
  );
};
