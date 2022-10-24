import PropTypes from 'prop-types';

import { AiOutlineSearch } from 'react-icons/ai';
import css from './Button.module.scss';

export const ButtonSubmit = () => {
  return (
    <button type="submit" className={css.buttonSubmit}>
      <AiOutlineSearch className={css.buttonSubmitSvg} size={18} />
    </button>
  );
};

export const ButtonLoader = ({ nextPageHandler }) => {
  return (
    <button
      type="button"
      className={css.ButtonLoader}
      onClick={nextPageHandler}
    >
      Load more
    </button>
  );
};
ButtonLoader.propTypes = {
  nextPageHandler: PropTypes.func.isRequired,
};
