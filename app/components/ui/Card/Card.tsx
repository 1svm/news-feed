import React from "react";
import classNames from "classnames";

import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  dark?: boolean;
  padding?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> & {
  Thumbnail: typeof Thumbnail;
  Title: typeof Title;
  Description: typeof Description;
  Author: typeof Author;
  Age: typeof Age;
  Content: typeof Content;
} = ({ children, size, dark, padding, selected, onClick = () => {} }) => {
  const cardClass = classNames(styles.card, {
    [styles.small]: size === "small",
    [styles.medium]: size === "medium",
    [styles.large]: size === "large",
    [styles.dark]: dark,
    [styles.padding]: padding,
    [styles.selected]: selected,
  });

  return (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );
};

interface ThumbnailProps {
  src: any;
  alt: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className={styles.thumbnail} />;
};

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};

interface DescriptionProps {
  children: React.ReactNode;
}

const Description: React.FC<DescriptionProps> = ({ children }) => {
  return <div className={styles.description}>{children}</div>;
};

interface AuthorProps {
  children: React.ReactNode;
}

const Author: React.FC<AuthorProps> = ({ children }) => {
  return <span className={styles.author}>{children}</span>;
};

interface AgeProps {
  children: React.ReactNode;
}

const Age: React.FC<AgeProps> = ({ children }) => {
  return <span className={styles.age}>{children}</span>;
};

interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};

// Assign compound components to Card
Card.Thumbnail = Thumbnail;
Card.Title = Title;
Card.Description = Description;
Card.Author = Author;
Card.Age = Age;
Card.Content = Content;

export { Card, Thumbnail, Title, Description, Author, Age, Content };
