import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  register: (name: string, options?: object) => { onChange: () => void; onBlur: () => void; name: string; ref: (instance: HTMLInputElement | null) => void };
  validation?: object;
  errors: Record<string, { message?: string }>;
  className?: string;
  showStar?: boolean;
  disabled?: boolean;
  upper?: boolean;
  iconLabel?: string;
  labelColor?: string;
  max?: number;
  min?: number;
  allowNumbersOnly?: boolean;
  allowNumbersOnlyminus?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  validation = {},
  errors,
  className,
  showStar = true,
  disabled = false,
  upper = false,
  labelColor,
  max,
  min,
  allowNumbersOnly = false,
  allowNumbersOnlyminus = false,
}) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    if (upper) value = value.toUpperCase();
    if (allowNumbersOnly) value = value.replace(/[^0-9]/g, '');
    if (allowNumbersOnlyminus) value = value.replace(/[^0-9-]/g, '');
    e.currentTarget.value = value;
  };

  return (
    <div className={`${styles.inputContainer} ${className} my-5`}>
      {label && (
        <label htmlFor={id}>
          <span className={`${labelColor || 'text-primary-800'} text-md`}>{label}</span>
          {showStar && <span className={`${labelColor || 'text-error'} text-md`}> *</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${upper ? styles['uppercase-input'] : ''} ${className || 'w-full'} ${errors?.[id] ? styles.error : ''
          }`}
        style={{ borderColor: errors?.[id] ? 'red' : '#dbdade' }}
        {...register(id, validation)}
        disabled={disabled}
        onInput={handleChange}
        maxLength={max}
        max={max}
        min={min}
      />
      {errors?.[id] && showStar && <p className={styles.errorMessage}>{errors[id]?.message}</p>}
    </div>
  );
};

export default Input;
