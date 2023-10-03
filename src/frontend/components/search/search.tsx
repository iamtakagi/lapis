import React, { memo } from 'react';
import { useSearchForm } from './useSearchForm';

export const Search: React.FC = memo(() => {
  const { searchText, inputRef, setSearchText, onSubmit } = useSearchForm();
  return (
    <form onSubmit={e => onSubmit(e)}>
      <label htmlFor="searchText">けんさく</label>
      <input
        type="text"
        name="searchText"
        id="searchText"
        ref={inputRef}
        value={searchText}
        onChange={e => {
          setSearchText(e.currentTarget.value);
        }}
      />
      <button type="submit">検索</button>
    </form>
  );
});
