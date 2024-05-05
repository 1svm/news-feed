import React from "react";
import styles from "./Nav.module.css";

interface NavProps {
  children: React.ReactNode;
}

export const Nav: React.FC<NavProps> & { Item: typeof NavItem } = ({
  children,
}) => {
  return (
    <nav>
      <ul className={styles.nav}>{children}</ul>
    </nav>
  );
};

interface NavItemProps {
  children: React.ReactNode;
  alignRight?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  children,
  alignRight = false,
}) => {
  return (
    <li className={`${styles.item} ${alignRight ? "align-right" : ""}`}>
      {children}
    </li>
  );
};

Nav.Item = NavItem;
