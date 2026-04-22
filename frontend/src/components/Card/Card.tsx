import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'flat' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = 'md',
  className = '',
  onClick,
}) => {
  const cardClass = `${styles.card} ${styles[variant]} ${styles[`p-${padding}`]} ${onClick ? styles.clickable : ''} ${className}`;
  
  return (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );
};
