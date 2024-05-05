import React, { ReactNode } from "react";
import styles from "./Inline.module.css";
import classNames from "classnames";

interface InlineProps {
  children: ReactNode;
  gap?: "small" | "medium" | "large" | "extra-large" | "xx-large";
  alignItems?: "stretch" | "center";
  justifyContent?: "start" | "center";
}

export const Inline: React.FC<InlineProps> = ({
  children,
  gap,
  alignItems,
  justifyContent,
}) => {
  const inlineClasses = classNames(styles.inline, {
    [styles[`align-${alignItems}`]]: alignItems,
    [styles[`justify-${justifyContent}`]]: justifyContent,
    [styles[`gap-${gap}`]]: gap,
  });

  return <div className={inlineClasses}>{children}</div>;
};
