import React from "react";
import {useDispatch} from "react-redux";
import {filterChange} from "../reducers/filterReducer";

const Filter = () => {
  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
  }
  const style = {
    marginBottom: 10
  }
  const dispatch = useDispatch()
  return (
    <div style={style}>
      <label>
        filter <input type={'text'} onChange={handleChange}/>
      </label>
    </div>
  )
}

export default Filter