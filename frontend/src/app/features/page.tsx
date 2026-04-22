import { CheckCircle2, ShieldCheck, MapPin, CalendarDays, Bot, LineChart } from 'lucide-react';
import styles from './page.module.css';
import { Card } from '@/components';

export default function Features() {
  const features = [
    {
      title: 'Eligibility Checker',
      desc: 'Instantly verify your voter registration status and find out exactly what documents you need to vote securely.',
      icon: <CheckCircle2 size={24} />,
    },
    {
      title: 'AI Chat Assistant',
      desc: 'Ask our Gemini-powered AI any question about the election process, candidate histories, and voting rights.',
      icon: <Bot size={24} />,
    },
    {
      title: 'Election Pipeline',
      desc: 'Follow the timeline step-by-step from nomination to counting. Never miss an important date again.',
      icon: <CalendarDays size={24} />,
    },
    {
      title: 'Polling Location',
      desc: 'Find your designated polling booth on the map, complete with directions and peak hour predictions.',
      icon: <MapPin size={24} />,
    },
    {
      title: 'Secure Dashboard',
      desc: 'Your data is secured with Firebase Authenticator and OTP based login for maximum privacy.',
      icon: <ShieldCheck size={24} />,
    },
    {
      title: 'Live Statistics',
      desc: 'Watch the turnout and early trends in a simplified, non-biased data view when election day arrives.',
      icon: <LineChart size={24} />,
    },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Powerful Features for <br/><span className="gradient-text">Every Voter</span></h1>
        <p className={styles.subtitle}>
          We've built all the tools you need to make an informed choice.
        </p>
      </div>

      <div className={styles.grid}>
        {features.map((feature, idx) => (
          <Card key={idx} variant="elevated" className={styles.card}>
            <div className={styles.iconWrapper}>
              {feature.icon}
            </div>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardDesc}>{feature.desc}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
