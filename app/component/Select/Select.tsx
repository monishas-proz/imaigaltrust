import React from 'react';
import styles from './Input.module.css';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  id: string;
  label?: string;
  options: SelectOption[];
  register: (name: string, options?: object) => { onChange: () => void; onBlur: () => void; ref: (instance: HTMLSelectElement | null) => void };
  validation?: object;
  errors: Record<string, { message: string }>;
  className?: string;
  showStar?: boolean;
  disabled?: boolean;
  labelColor?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  register,
  validation = {},
  errors,
  className,
  showStar = true,
  disabled = false,
  labelColor,
}) => {
  return (
    <div className={`${styles.inputContainer} ${className} my-5`}>
      {label && (
        <label htmlFor={id}>
          <span className={`${labelColor || 'text-primary-800'} text-md`}>{label}</span>
          {showStar && <span className={`${labelColor || 'text-error'} text-md`}> *</span>}
        </label>
      )}
      <select
        id={id}
        className={`${className || 'w-full'} ${errors?.[id] ? styles.error : ''}`}
        style={{ borderColor: errors?.[id] ? 'red' : '#dbdade' }}
        {...register(id, validation)}
        disabled={disabled}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errors?.[id] && showStar && <p className={styles.errorMessage}>{errors[id]?.message}</p>}
    </div>
  );
};

export default Select;
