import React from "react";
import "./Search.scss";

import debounce from 'lodash.debounce'

import { useDispatch } from "react-redux";
import { setValueInput } from "../../redux/slices/filterSlice";

export const Search: React.FC = () => {

  const [value, setValue] = React.useState('')

  const updateInput = React.useCallback(
    debounce((str:string) => {
      dispatch(setValueInput(str));
    }, 1000), []
  );

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const onClickDel = () => {
    setValue('');
    dispatch(setValueInput(""));
    inputRef.current?.focus();
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateInput(e.target.value);
  };


  return (
    <div className="search">
      <input
        type="text"
        value={value}
        onChange={(e) => onChangeInput(e)}
        className="search-input"
        placeholder="Поисk..."
        ref={inputRef}
      />
      <span onClick={onClickDel}>X</span>
    </div>
  );
};
