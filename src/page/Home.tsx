import React from "react";
import ReactPaginate from "react-paginate";

import { Category } from "../components/Category";
import { Sort } from "../components/Sort";
import { DisplayPizza } from "../components/DisplayPizza";

import { useDispatch } from "react-redux";
import { setCurrentPage } from "../redux/slices/filterSlice";

export const Home: React.FC = () => {

  const dispatch = useDispatch()

  return (
    <>
      <div className="app-sort">
        <Category />
        <Sort />
      </div>
      <DisplayPizza />

      <ReactPaginate
        className="pagination"
        nextLabel=">"
        onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
        pageRangeDisplayed={8}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
