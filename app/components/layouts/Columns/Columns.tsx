import React from "react";
import styles from "./Columns.module.css";
import classNames from "classnames";

interface ColumnsProps {
  children: React.ReactNode;
}

export const Columns: React.FC<ColumnsProps> & {
  Column: typeof Column;
} = ({ children }) => {
  return <div className={styles.columns}>{children}</div>;
};

interface ColumnProps {
  children: React.ReactNode;
  size?: "25" | "50" | "75" | "100" | "30" | "70";
}

const Column: React.FC<ColumnProps> = ({ children, size }) => {
  const columnClasses = classNames(styles.column, styles[`size-${size}`]);
  return <div className={columnClasses}>{children}</div>;
};

Columns.Column = Column;
