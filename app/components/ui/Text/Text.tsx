import React, { ReactNode } from "react";
import styles from "./Text.module.css";
import classNames from "classnames";

interface TextProps {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  color?: "black" | "gray" | "lightskyblue";
  weight?: "normal" | "bold";
  align?: "left" | "center" | "right";
}

export const Text: React.FC<TextProps> = ({
  children,
  size,
  color,
  weight,
  align,
}) => {
  const textClasses = classNames(styles.text, {
    [styles[`size-${size}`]]: size,
    [styles[`color-${color}`]]: color,
    [styles[`weight-${weight}`]]: weight,
    [styles[`align-${align}`]]: align,
  });

  return <span className={textClasses}>{children}</span>;
};
