import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './FormLabelValidation.module.css';
import Label from '../Label';
import Paragraph from '../Paragraph';

const FormLabelValidation = ({
  labelTarget,
  labelText,
  errorTarget,
  infoText,
}) => {
  return (
    <div className={styles.Label_Wrapper}>
      <Label htmlFor={labelTarget}>{labelText}</Label>
      {!!errorTarget && (
        <Paragraph className={styles.Error_Text}>{errorTarget}</Paragraph>
      )}
      {!errorTarget && !!infoText && (
        <Paragraph className={styles.Info_Text}>{infoText}</Paragraph>
      )}
    </div>
  );
};

FormLabelValidation.propTypes = {
  labelTarget: PropTypes.node.isRequired,
  labelText: PropTypes.string.isRequired,
  errorTarget: PropTypes.string,
  infoText: PropTypes.string,
};

FormLabelValidation.defaultProps = {
  labelTarget: null,
  labelText: null,
  errorTarget: null,
  infoText: null,
};

export default memo(FormLabelValidation);
