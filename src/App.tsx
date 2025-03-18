import React from "react";
import "./App.scss";

import { Header } from "./components/Header";
import { Home } from "./page/Home";
import { Cart } from "./components/Cart";
import { InsidePizza } from "./components/InsidePizza";

import { Route, Routes } from "react-router-dom";

import qs from "qs";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { FetchData, fetchPizzas } from "./redux/slices/pizzaSlice";
import { setFilters } from "./redux/slices/filterSlice";

import { sortList } from "./components/Sort";
import { AppDispatch, RootState } from "./redux/store";

export const App = () => {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const category = useSelector((state: RootState) => state.filter.categoryId);
  const sort = useSelector((state: RootState) => state.filter.sort);
  const valueInput = useSelector((state: RootState) => state.filter.search);
  const currentPage = useSelector(
    (state: RootState) => state.filter.currentPage
  );

  // const {category, sort, valueInput, currentPage} = useSelector(state => state.filter)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const categoryId = category > 0 ? `category=${category}` : "";
  const sortId = sort.sortProperty.replace("-", "");
  const orderId = sort.sortProperty.includes("-") ? "desc" : "asc";
  const search = valueInput ? `search=${valueInput}` : "";

  const fetchData = async () => {
    dispatch(
      fetchPizzas({
        categoryId,
        sortId,
        orderId,
        search,
        currentPage: currentPage.toString(),
      })
    );
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FetchData;

      const sort = sortList.find((obj) => obj.sortProperty === params.sortId);

      if (sort) {
        dispatch(
          setFilters({
            categoryId: Number(params.categoryId),
            search: params.search,
            currentPage: currentPage,
            sort: sort,
          })
        );
      }

      isSearch.current = true;
    }
  }, [currentPage, dispatch]);

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchData();
    }

    isSearch.current = false;
  }, [category, sort, valueInput, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortId: sort.sortProperty,
        category,
        currentPage,
        valueInput,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [category, sort, currentPage, valueInput, navigate]);

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<InsidePizza />} />
      </Routes>
    </div>
  );
};
