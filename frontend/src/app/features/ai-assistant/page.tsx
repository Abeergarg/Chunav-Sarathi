'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ChatAssistant } from '@/components';
import styles from './page.module.css';
import { ShieldCheck, MessageSquare, Sparkles, Globe, Zap } from 'lucide-react';
import { Card, Button } from '@/components';
import { useRouter } from 'next/navigation';

export default function AIAssistantPage() {
  const { user, loading, loginWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Open chat automatically after a short delay
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('open-chat'));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className={styles.loaderContainer}><div className={styles.loader}></div></div>;

  if (!user) {
    return (
      <main className={styles.authPage}>
        <div className="bg-grid-layer"></div>
        <Card variant="glass" className={styles.authCard}>
          <Sparkles className={styles.authIcon} />
          <h1>Access AI Assistant</h1>
          <p>Please sign in to your account to start a conversation with your personal voting guide.</p>
          <Button onClick={loginWithGoogle} fullWidth className="glow-on-hover">
            Sign In with Google
          </Button>
        </Card>
      </main>
    );
  }

  return (
    <main className={styles.pageMain}>
      {/* Reverting to initial clean grid-line background */}
      <div className="bg-grid-layer"></div>
      <div className="bg-glow-layer"></div>

      <div className="container">
        <header className={styles.header}>
          <Button variant="outline" size="sm" onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
          <div className={styles.brand}>
            <Sparkles size={20} /> Chunav-Sarathi AI
          </div>
        </header>

        <section className={styles.content}>
          <Card variant="glass" className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}><MessageSquare /></div>
              <h2>Interactive Election Guide</h2>
            </div>
            
            <p className={styles.description}>
              Meet your personal assistant for the Indian Democratic process. 
              Our AI is designed to provide you with verified, unbiased, and 
              instant information in your preferred language.
            </p>

            <div className={styles.featureGrid}>
              <div className={styles.featureItem}>
                <Globe size={18} />
                <span>12+ Native Languages</span>
              </div>
              <div className={styles.featureItem}>
                <Zap size={18} />
                <span>Instant ECI Data Verification</span>
              </div>
              <div className={styles.featureItem}>
                <ShieldCheck size={18} />
                <span>Secure & Privacy-First</span>
              </div>
            </div>

            <div className={styles.prompts}>
              <p className={styles.promptLabel}>Suggested Topics:</p>
              <div className={styles.promptButtons}>
                <button onClick={() => window.dispatchEvent(new CustomEvent('chat-prompt', { detail: 'How to register for a new Voter ID?' }))}>
                  Voter Registration
                </button>
                <button onClick={() => window.dispatchEvent(new CustomEvent('chat-prompt', { detail: 'Find my polling station' }))}>
                  Polling Station
                </button>
                <button onClick={() => window.dispatchEvent(new CustomEvent('chat-prompt', { detail: 'What are the election dates?' }))}>
                  Election Dates
                </button>
              </div>
            </div>

            <Button fullWidth size="lg" className={styles.mainBtn} onClick={() => window.dispatchEvent(new Event('open-chat'))}>
              Launch Chat Now
            </Button>
          </Card>

          <p className={styles.disclaimer}>
            <ShieldCheck size={14} /> Powered by Official ECI Public Data
          </p>
        </section>
      </div>

      <ChatAssistant />
    </main>
  );
}
