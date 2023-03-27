import React from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import Notiflix from 'notiflix';
import {Search, SearchBTN, SearchBTNLabel, SearchForm, SearchInput } from "./Searchbar.styled";

export default function Searchbar({onSearch}) {
  
  const [value, setValue] = useState('')

 const handleChange = event => {
        setValue(event.currentTarget.value.toLowerCase())
    };

  const handleSubmit = (e) => {
        e.preventDefault();

        if (value.trim() === '') {
            Notiflix.Notify.failure('Введіть пошуковий запит');;
            return;
        }
        onSearch(value)
        setValue('')
    }

return (
        <Search>
  <SearchForm onSubmit={handleSubmit}>
    <SearchBTN type="submit">
      <SearchBTNLabel>Search</SearchBTNLabel>
    </SearchBTN>

    <SearchInput
      type="text"
    placeholder="Search images and photos"
                      onChange={handleChange}
                      value={value}
    />
  </SearchForm>
</Search>
    )

}


Searchbar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

