import { Component } from 'react';
import './search-box.styles.css';

const SearchBox = ({ onChangeHandler }) => {
  return (
    <div class="form-outline">
        <input type="search" id="form1" class="form-control" placeholder="Search Twitter" onChange={onChangeHandler} />
    </div>
  );
}

export default SearchBox;
