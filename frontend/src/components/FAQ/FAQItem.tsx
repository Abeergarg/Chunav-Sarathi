'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './FAQ.module.css';

interface FAQItemProps {
  question: string;
  answer: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.item} ${isOpen ? styles.open : ''}`}>
      <button className={styles.question} onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div className={styles.answer}>
        <div className={styles.answerContent}>
          {answer}
        </div>
      </div>
    </div>
  );
};
