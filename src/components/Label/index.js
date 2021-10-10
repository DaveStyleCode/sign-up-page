import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './Label.module.css';
import classNames from 'classnames';

const Label = ({ className, children, htmlFor }) => {
  let cx = classNames.bind(styles);
  const classes = cx(styles.Label, [className]);

  return (
    <label htmlFor={htmlFor} className={classes}>
      {children}
    </label>
  );
};

Label.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  htmlFor: PropTypes.string.isRequired,
};

Label.defaultProps = {
  className: null,
  children: null,
  htmlFor: null,
};

export default memo(Label);
