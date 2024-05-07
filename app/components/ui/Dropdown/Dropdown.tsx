import React, { ReactNode } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps extends React.HTMLProps<HTMLSelectElement> {
  children: ReactNode;
  label?: string;
  placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> & {
  Option: typeof DropdownOption;
} = ({ children, value, onChange, label, placeholder, ...rest }) => {
  return (
    <div className={styles.dropdown}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange?.(e)}
        {...rest}
      >
        {placeholder && !value && <option value="">{placeholder}</option>}
        {children}
      </select>
      <div className={styles.icon}>▼</div>
    </div>
  );
};

interface DropdownOptionProps extends React.HTMLProps<HTMLOptionElement> {
  value: string;
  children: ReactNode;
}

const DropdownOption: React.FC<DropdownOptionProps> = ({
  value,
  children,
  ...rest
}) => {
  return (
    <option value={value} {...rest}>
      {children}
    </option>
  );
};

Dropdown.Option = DropdownOption;
