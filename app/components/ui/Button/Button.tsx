import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size,
  color,
  disabled,
  onClick,
  ...props
}) => {
  const buttonClasses = classNames(styles.button, {
    [styles[`size-${size}`]]: size,
    [styles[`color-${color}`]]: color,
  });

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
