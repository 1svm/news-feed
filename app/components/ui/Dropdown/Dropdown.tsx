import React, { ReactNode } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  children: ReactNode;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> & {
  Option: typeof DropdownOption;
} = ({ children, value, onChange, label, placeholder }) => {
  return (
    <div className={styles.dropdown}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder && !value && <option value="">{placeholder}</option>}
        {children}
      </select>
      <div className={styles.icon}>▼</div>
    </div>
  );
};

interface DropdownOptionProps {
  value: string;
  children: ReactNode;
}

const DropdownOption: React.FC<DropdownOptionProps> = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

Dropdown.Option = DropdownOption;
