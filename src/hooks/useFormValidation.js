import { useCallback, useState } from 'react';
import { has } from 'lodash';

const useFormValidation = (initialState = {}, validate = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValidForm, setIsValidForm] = useState(false);

  const handleFormStateChange = useCallback((event) => {
    event.preventDefault();
    const { name, value: newValue, type } = event.target;

    if (!name || !type) {
      return;
    }

    const value = type === 'number' ? +newValue : newValue;

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    // reset error for this input
    setErrors((prevErrors) => {
      // remove whatever error was there previously
      const { [name]: removedError, ...rest } = prevErrors;
      return {
        ...rest,
      };
    });

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value.trim(),
    }));
  }, []);

  const handleBlurOrFucusInput = useCallback(
    (event) => {
      event.preventDefault();
      // return;

      const { name, value, type } = event.target;

      if (!name || !type) {
        return;
      }

      setValues((prevValues) => ({
        ...prevValues,
        [name]: value.trim(),
      }));

      setTouched((prevTouched) => ({
        ...prevTouched,
        [name]: true,
      }));

      if (has(validate, name)) {
        setErrors((prevErrors) => {
          // check for a new error
          const error = validate[name](value, values);
          // remove whatever error was there previously
          const { [name]: removedError, ...rest } = prevErrors;
          return {
            ...rest,
            ...(error && { [name]: touched[name] && error }),
          };
        });
      }
    },
    [touched, validate, values],
  );

  const getIsFormValid = useCallback(() => {
    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validate[key](values[key], values);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError }),
          },
          touched: {
            ...acc.touched,
            ...newTouched,
          },
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched },
      },
    );
    setErrors(formValidation.errors);
    setTouched(formValidation.touched);

    const isValid = Object.values(formValidation.errors).length === 0;

    setIsValidForm(isValid);

    return isValid;
  }, [errors, touched, validate, values]);

  return {
    handleFormStateChange,
    handleBlurOrFucusInput,
    values,
    errors,
    isValidForm,
    getIsFormValid,
  };
};

export default useFormValidation;
