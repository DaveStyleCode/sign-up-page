import { useCallback, useState } from 'react';
import { keys } from 'lodash';

const getFormErrors = (formValues, errors, validate) => {
  return keys(formValues).reduce((acc, key) => {
    const newError = validate[key](formValues[key], formValues);
    return {
      ...acc,
      ...(newError && { [key]: newError }),
    };
  }, errors);
};

const useFormValidation = (initialState = {}, validate = {}) => {
  const [formValues, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleFormStateChange = useCallback((event) => {
    event.preventDefault();
    const { name, type, value } = event.target;
    if (!name || !type) {
      return;
    }
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value.trim(),
    }));
  }, []);

  const handleBlurOrFucusInput = useCallback((event) => {
    event.preventDefault();

    const { name, type } = event.target;

    if (!name || !type) {
      return;
    }
    // reset error for this input
    setErrors((prevErrors) => {
      // remove whatever error was there previously
      const { [name]: removedError, ...rest } = prevErrors;
      return {
        ...rest,
      };
    });
  }, []);

  const checkIsFormValid = () => {
    const formErrors = getFormErrors(formValues, errors, validate);
    const isValid = keys(formErrors).length === 0;
    setErrors(formErrors);
    return isValid;
  };

  return {
    checkIsFormValid,
    errors,
    handleBlurOrFucusInput,
    handleFormStateChange,
    formValues,
  };
};

export default useFormValidation;
