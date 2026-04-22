import React from 'react';
import styles from './page.module.css';

export default function PrivacyPage() {
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.header}>
          <h1 className="gradient-text">Privacy Policy</h1>
          <p>How we protect and manage your data.</p>
        </div>
        <div className={styles.content}>
          <h2>Data Collection</h2>
          <p>We only collect data necessary for providing election-related services. This includes your registration status and basic profile information if you choose to sign in.</p>
          
          <h2>Data Security</h2>
          <p>Your data is stored securely using Firebase and is never shared with third parties for commercial purposes. We follow all local data protection laws.</p>
          
          <h2>AI Interactions</h2>
          <p>Your conversations with our AI assistant are used solely to improve the quality of responses and are anonymized for research purposes.</p>
        </div>
      </div>
    </main>
  );
}
