'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button, Card } from '@/components';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Bot, 
  MapPin, 
  ShieldCheck,
  ArrowLeft,
  Lock
} from 'lucide-react';
import styles from './page.module.css';

const featureData: any = {
  'eligibility': {
    title: 'Eligibility Checker',
    icon: <CheckCircle2 size={48} />,
    desc: 'Verify your eligibility to vote in the upcoming elections. We check your age, citizenship status, and registration details against official electoral rolls.',
    requiresAuth: false,
    details: [
      'Automatic age verification from your documents.',
      'Citizen verification guided steps.',
      'Check if your name exists in the current electoral roll.'
    ]
  },
  'ai-assistant': {
    title: 'Gemini AI Assistant',
    icon: <Bot size={48} />,
    desc: 'Get instant answers to your voting questions. Our AI is trained on official Election Commission of India guidelines.',
    requiresAuth: true,
    details: [
      '24/7 availability for complex queries.',
      'Multi-language support (Hindi, English, and regional).',
      'Context-aware answers regarding your constituency.'
    ]
  },
  'booth-locator': {
    title: 'Booth Locator',
    icon: <MapPin size={48} />,
    desc: 'Find exactly where you need to go to cast your vote. Interactive maps and navigation help you reach your polling station easily.',
    requiresAuth: true,
    details: [
      'Google Maps integration for precise locations.',
      'Wait-time estimations (based on crowd data).',
      'Facility information (accessibility, water, etc.).'
    ]
  },
  'security': {
    title: 'Secure Identity',
    icon: <ShieldCheck size={48} />,
    desc: 'Enterprise-grade protection for your sensitive voter information. We prioritize your privacy above all.',
    requiresAuth: false,
    details: [
      'Firebase encrypted authentication.',
      'Zero-knowledge data storage for personal IDs.',
      'Regular security audits and compliance.'
    ]
  }
};

export default function FeatureDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const feature = featureData[id as string];

  if (!feature) {
    return <div className="container" style={{padding: '200px 0'}}>Feature not found.</div>;
  }

  const isLocked = feature.requiresAuth && !user;

  return (
    <main className={styles.main}>
      <div className="container">
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className={styles.contentGrid}>
          <Card className={styles.featureCard}>
            <div className={styles.iconHeader}>
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h1 className="gradient-text">{feature.title}</h1>
            </div>
            <p className={styles.desc}>{feature.desc}</p>
            
            <div className={styles.details}>
              <h3>Key Capabilities</h3>
              <ul>
                {feature.details.map((detail: string, i: number) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          </Card>

          <Card variant={isLocked ? 'elevated' : 'glass'} className={styles.actionCard}>
            {isLocked ? (
              <div className={styles.lockedState}>
                <div className={styles.lockIcon}><Lock size={32} /></div>
                <h3>Access Restricted</h3>
                <p>This premium feature requires you to be logged in to your Chunav-Sarathi account.</p>
                <Link href="/dashboard">
                  <Button fullWidth>Login to Access</Button>
                </Link>
              </div>
            ) : (
              <div className={styles.readyState}>
                <h3>Feature Ready</h3>
                <p>You can access this tool directly from your dashboard.</p>
                <Link href="/dashboard">
                  <Button fullWidth>Go to Dashboard</Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}
