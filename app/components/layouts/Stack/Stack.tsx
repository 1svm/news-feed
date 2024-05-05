import React, { ReactNode } from "react";
import styles from "./Stack.module.css";
import classNames from "classnames";

interface StackProps {
  children: ReactNode;
  gap?: "small" | "medium" | "large" | "extra-large" | "xx-large";
  alignItems?: "stretch" | "center";
  justifyContent?: "start" | "center";
}

export const Stack: React.FC<StackProps> = ({
  children,
  gap,
  alignItems,
  justifyContent,
}) => {
  const stackClasses = classNames(styles.stack, {
    [styles[`gap-${gap}`]]: gap,
    [styles[`align-${alignItems}`]]: alignItems,
    [styles[`justify-${justifyContent}`]]: justifyContent,
  });

  return <div className={stackClasses}>{children}</div>;
};
