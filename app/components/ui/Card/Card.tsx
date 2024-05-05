import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> & {
  Thumbnail: typeof Thumbnail;
  Title: typeof Title;
  Description: typeof Description;
  Author: typeof Author;
  Age: typeof Age;
  Content: typeof Content;
} = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

interface ThumbnailProps {
  src: string;
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
  return <p className={styles.description}>{children}</p>;
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
