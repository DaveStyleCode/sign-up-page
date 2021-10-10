import React, { memo } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import styles from './Button.module.css';

const Button = ({ className, value, children }) => {
  const classes = classNames(styles.Button, className);

  return <button className={classes}>{value ? value : children}</button>;
};

Button.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Button.defaultProps = {
  className: null,
  children: null,
  value: '',
};

export default memo(Button);
