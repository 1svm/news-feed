import React from "react";
import styles from "./SearchInput.module.css";
import cx from "classnames";

interface SearchInputProps {
  placeholder?: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "danger";
  onSearch: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  size,
  color,
  onSearch,
  placeholder = "Press enter to search...",
}) => {
  const inputClasses = cx(styles.searchInput, {
    [styles[`size-${size}`]]: size,
    [styles[`color-${color}`]]: color,
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch((event.target as HTMLInputElement).value);
    }
  };

  return (
    <input
      type="search"
      className={inputClasses}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
    />
  );
};
