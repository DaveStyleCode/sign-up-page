import React, { memo } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './Paragraph.module.css';

const Paragraph = ({ className, children }) => {
  let cx = classNames.bind(styles);
  const classes = cx(styles.Paragraph, [className]);

  return <p className={classes}>{children}</p>;
};

Paragraph.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Paragraph.defaultProps = {
  className: null,
  children: null,
};

export default memo(Paragraph);
