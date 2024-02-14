import React from 'react';
import './search.css';
import { useSearchHelperHook } from './hooks/use-search-helper.hook';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

const Search = () => {
  const { query, handleSearchQueryChange } = useSearchHelperHook();
  return (
    <div className="search">
      <div className="search-container">
        <SearchIcon />
        <input
          type="text"
          className="search__input"
          placeholder="Знаходьте інвестиції, формат пошуку: AAPL, GOOGL, MSFT і т.д"
          value={query}
          onChange={handleSearchQueryChange}
        />
      </div>
    </div>
  );
};

export default Search;
