import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <input
          id={inputId}
          className={`${styles.input} ${error ? styles.inputError : ''} ${icon ? styles.hasIcon : ''}`}
          {...props}
        />
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};
