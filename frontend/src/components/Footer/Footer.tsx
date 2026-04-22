import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className="gradient-text">Chunav-Sarathi</span>
            <p>Empowering every voter with clarity and confidence.</p>
          </div>
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4>Platform</h4>
              <a href="/#features">Features</a>
              <a href="/#pipeline">Pipeline</a>
              <a href="/#about">About Us</a>
            </div>
            <div className={styles.linkGroup}>
              <h4>Resources</h4>
              <a href="/faq">FAQ</a>
              <a href="/support">Support</a>
              <a href="/privacy">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Chunav-Sarathi. Built with ❤️ for Democracy.</p>
        </div>
      </div>
    </footer>
  );
};
