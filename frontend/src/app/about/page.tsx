import React from 'react';
import styles from './page.module.css';
import { Card } from '@/components';
import { Target, Users, Shield, Heart } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: 'Transparency',
      desc: 'We provide unbiased, verified information from official sources to ensure you have the facts.',
      icon: <Target size={24} />
    },
    {
      title: 'Inclusivity',
      desc: 'Our platform is designed to be accessible to everyone, regardless of their technical expertise.',
      icon: <Users size={24} />
    },
    {
      title: 'Privacy',
      desc: 'Your personal data and registration details are protected with enterprise-grade security.',
      icon: <Shield size={24} />
    },
    {
      title: 'Commitment',
      desc: 'We are committed to strengthening democracy by empowering every citizen to vote.',
      icon: <Heart size={24} />
    }
  ];

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Our <span className="gradient-text">Mission</span></h1>
        <p className={styles.subtitle}>
          Chunav-Sarathi was born out of a simple idea: that every citizen deserves to navigate the democratic process with clarity and confidence.
        </p>
      </section>

      <section className={styles.content}>
        <div className={styles.textSection}>
          <h2>Why Chunav-Sarathi?</h2>
          <p>
            In a world of information overload, finding reliable, actionable information about elections can be challenging. Chunav-Sarathi (which means "Election Charioteer") acts as your guide, simplifying complex processes into easy-to-follow steps.
          </p>
          <p>
            Whether you're a first-time voter or a seasoned participant, our platform provides the tools and insights you need to make your voice heard.
          </p>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>Our Core Values</h2>
        <div className={styles.valuesGrid}>
          {values.map((value, idx) => (
            <Card key={idx} variant="elevated" className={styles.valueCard}>
              <div className={styles.iconWrapper}>{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
