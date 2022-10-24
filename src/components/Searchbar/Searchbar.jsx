import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ButtonSubmit } from '../Button/Button';
import css from './Searchbar.module.scss';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSearchInput = ({ target: { value } }) => {
    const query = value.toLowerCase();
    setQuery(query);
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.warn('Enter image category name');
    }
    onSubmit(query);
    onFormReset();
  };

  const onFormReset = () => {
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={e => handleOnSubmit(e)}>
        <ButtonSubmit />
        css
        <input
          className={css.SearchInput}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearchInput}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
