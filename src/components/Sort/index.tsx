import React from "react";
import "./Sort.scss";

import { useSelector, useDispatch } from "react-redux";
import { FilterSort, setSort, SortStatus } from "../../redux/slices/filterSlice";

export const sortList: FilterSort[] = [
  { name: "популярности (ASC)", sortProperty: SortStatus.RATING_DESC },
  { name: "популярности (DESC)", sortProperty: SortStatus.RATING_ASC },
  { name: "цене (ASC)", sortProperty: SortStatus.PRICE_DESC },
  { name: "цене (DESC)", sortProperty: SortStatus.PRICE_ASC },
  { name: "алфавиту (ASC)", sortProperty: SortStatus.TITLE_DESC },
  { name: "алфавиту (DESC)", sortProperty: SortStatus.TITLE_ASC },
];

export const Sort = () => {
  const [open, setOpen] = React.useState(false);
  const popRef = React.useRef<HTMLDivElement>(null);

  const sort = useSelector((state: any) => state.filter.sort);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) : void => {
      if (
        popRef.current &&
        !popRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [popRef]);

  return (
    <>
      <div className="sort" onClick={() => setOpen(!open)} ref={popRef}>
        <b>Сортировать по: </b>
        <span>{sort.name}</span>
        {open && (
          <div className="sort-block">
            <ul className="sort-list">
              {sortList.map((item, index) => (
                <li
                  key={index}
                  className="sort-item"
                  onClick={() => dispatch(setSort(item))}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
