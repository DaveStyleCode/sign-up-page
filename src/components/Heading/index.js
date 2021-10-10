import React, { memo } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import styles from './Heading.module.css';

const elements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

const Heading = ({ type, className, children }) => {
  const HeadingTag = elements[type];
  const classes = classNames(styles.Heading, className);
  return <HeadingTag className={classes}>{children}</HeadingTag>;
};

Heading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  type: PropTypes.string,
};

Heading.defaultProps = {
  children: null,
  className: null,
  type: 'h1',
};

export default memo(Heading);
