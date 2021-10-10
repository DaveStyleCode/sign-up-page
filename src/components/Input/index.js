import React, { memo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Input.module.css';
import NumberFormat from 'react-number-format';

import { Eye, EyeOff } from 'react-feather';

const Input = ({
  ariaLabel,
  autoCapitalize,
  className,
  inputType,
  isValid,
  maxLength,
  autoFocus,
  name,
  onBlur,
  onChange,
  onFocus,
  value,
}) => {
  const inputRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [originalType, setOriginalType] = useState(inputType);

  const cx = classNames.bind(styles);

  const classes = cx(styles.Input, className, inputType, {
    Input__Invalid: isValid === false,
  });

  const onPasswordToggle = (event) => {
    event.preventDefault();
    setOriginalType(showPassword ? 'password' : 'text');
    setShowPassword((previewState) => !previewState);
  };

  return (
    <>
      {inputType === 'tel' ? (
        <NumberFormat
          id={name}
          name={name}
          autoFocus={autoFocus}
          value={value}
          format="(###) ###-####"
          mask="_"
          className={classes}
          type={inputType}
          aria-label={ariaLabel}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoCapitalize={autoCapitalize}
        ></NumberFormat>
      ) : (
        <div className={styles.Input_Wrapper}>
          <input
            id={name}
            ref={inputRef}
            name={name}
            autoFocus={autoFocus}
            value={value}
            className={classes}
            type={originalType}
            aria-label={ariaLabel}
            maxLength={maxLength}
            autoComplete="off"
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            autoCapitalize={autoCapitalize}
          />
          {!!value && inputType === 'password' && (
            <button
              className={styles.Password_Toggle}
              onClick={onPasswordToggle}
              tabIndex="-1"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      )}
    </>
  );
};

Input.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  autoCapitalize: PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  name: PropTypes.string,
  maxLength: PropTypes.number,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

Input.defaultProps = {
  ariaLabel: null,
  autoFocus: null,
  autoCapitalize: null,
  className: null,
  inputType: 'text',
  isValid: null,
  maxLength: null,
  name: null,
  onBlur: () => {},
  onFocus: () => {},
  onChange: () => {},
  value: null,
};

export default memo(Input);
