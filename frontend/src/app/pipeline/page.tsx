import React from 'react';
import styles from './page.module.css';
import { Card } from '@/components';
import { Bell, FileText, Megaphone, CheckSquare, BarChart3 } from 'lucide-react';

export default function Pipeline() {
  const steps = [
    {
      id: 1,
      title: 'Election Notification',
      description: 'The formal announcement of the election dates and schedule by the Election Commission.',
      icon: <Bell size={24} />,
      status: 'Completed',
      date: 'March 15, 2024'
    },
    {
      id: 2,
      title: 'Nomination Filing',
      description: 'Candidates file their nomination papers and affidavits. Scrutiny and withdrawal follows.',
      icon: <FileText size={24} />,
      status: 'In Progress',
      date: 'April 1 - April 15, 2024'
    },
    {
      id: 3,
      title: 'Campaigning',
      description: 'Candidates and parties share their visions and manifestos with the voters.',
      icon: <Megaphone size={24} />,
      status: 'Upcoming',
      date: 'April 16 - May 10, 2024'
    },
    {
      id: 4,
      title: 'Polling Day',
      description: 'The most crucial day when eligible voters cast their ballots at designated polling booths.',
      icon: <CheckSquare size={24} />,
      status: 'Upcoming',
      date: 'May 12, 2024'
    },
    {
      id: 5,
      title: 'Counting & Results',
      description: 'Votes are counted under strict supervision and the final results are declared.',
      icon: <BarChart3 size={24} />,
      status: 'Upcoming',
      date: 'May 15, 2024'
    }
  ];

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Election <span className="gradient-text">Journey</span></h1>
        <p className={styles.subtitle}>
          Track every milestone of the democratic process. From the first notification to the final result.
        </p>
      </div>

      <div className={styles.timeline}>
        {steps.map((step, index) => (
          <div key={step.id} className={styles.timelineItem}>
            <div className={styles.timelineMarker}>
              <div className={`${styles.markerDot} ${styles[step.status.replace(' ', '').toLowerCase()]}`}>
                {step.icon}
              </div>
              {index !== steps.length - 1 && <div className={styles.markerLine}></div>}
            </div>
            
            <Card className={styles.stepCard} variant="elevated">
              <div className={styles.stepHeader}>
                <span className={`${styles.statusBadge} ${styles[step.status.replace(' ', '').toLowerCase()]}`}>
                  {step.status}
                </span>
                <span className={styles.date}>{step.date}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </Card>
          </div>
        ))}
      </div>
    </main>
  );
}
