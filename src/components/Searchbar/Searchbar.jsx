import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { ButtonSubmit } from '../Button/Button';
import s from './Searchbar.module.scss';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSearchInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value.toLowerCase(),
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.warn('Enter image category name');
    }
    this.props.onSubmit(this.state.query);
    this.onFormReset();
  };

  onFormReset = () => {
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={e => this.handleOnSubmit(e)}>
          <ButtonSubmit />

          <input
            className={s.SearchInput}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
