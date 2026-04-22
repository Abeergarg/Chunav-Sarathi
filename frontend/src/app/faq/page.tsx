import React from 'react';
import { FAQItem } from '@/components/FAQ/FAQItem';
import styles from './page.module.css';

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I check if I'm eligible to vote?",
      answer: "You are eligible to vote if you are a citizen of India, 18 years or older on the qualifying date, and not disqualified by any law."
    },
    {
      question: "What documents do I need to register?",
      answer: "Typically, you need proof of identity (like an Aadhaar card or PAN card), proof of address (like a utility bill or rent agreement), and a passport-size photograph."
    },
    {
      question: "How does the AI assistant help me?",
      answer: "Our Gemini-powered assistant can answer questions about the voting process, candidate information, polling station locations, and more in real-time."
    },
    {
      question: "Is my personal data secure?",
      answer: "Yes, we use enterprise-grade security via Firebase and Google Cloud to ensure your data is encrypted and protected."
    },
    {
      question: "Can I find my polling station here?",
      answer: "Yes, you can use our Booth Locator feature to find your designated polling station on an interactive map."
    }
  ];

  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.header}>
          <h1 className="gradient-text">Frequently Asked Questions</h1>
          <p>Everything you need to know about Chunav-Sarathi and the voting process.</p>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </main>
  );
}
