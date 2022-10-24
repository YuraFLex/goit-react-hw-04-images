import PropTypes from 'prop-types';
import css from '../Notification/Notification.module.scss';

export const Notification = ({ msg }) => {
  return <h2 className={css.Notifikashka}>{msg}</h2>;
};

Notification.propTypes = {
  msg: PropTypes.string.isRequired,
};
