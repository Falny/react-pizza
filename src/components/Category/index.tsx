import React from 'react'
import './Category.scss'

import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';


const categories: string[] = [
  "Все",
  "Мясные",
  "Вегетерианские",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Category = () => {

  const category = useSelector((state: RootState) => state.filter.categoryId)
  const dispatch = useDispatch()

  return (
    <ul className="category-list">
      {categories.map((item, index) => (
        <li
          key={index}
          className={`category-item ${category === index && "active-item"}`}
          onClick={() => dispatch(setCategory(index))}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
