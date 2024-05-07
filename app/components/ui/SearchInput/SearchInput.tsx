import React from "react";
import styles from "./SearchInput.module.css";
import cx from "classnames";

interface SearchInputProps {
  placeholder?: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "danger";
  value?: string;
  onChange?: (value: string) => void;
  onEnterKeyPress?: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  size,
  color,
  onChange,
  onEnterKeyPress,
  placeholder = "Press enter to search...",
  ...props
}) => {
  const inputClasses = cx(styles.searchInput, {
    [styles[`size-${size}`]]: size,
    [styles[`color-${color}`]]: color,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.((event.target as HTMLInputElement).value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnterKeyPress?.((event.target as HTMLInputElement).value);
    }
  };

  return (
    <input
      type="text"
      name="query"
      className={inputClasses}
      placeholder={placeholder}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};
