import Link from 'next/link';
import styles from './page.module.css';
import { Button, Card } from '@/components';
import { 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  CalendarDays, 
  Bot, 
  LineChart,
  Bell, 
  FileText, 
  Megaphone, 
  CheckSquare, 
  BarChart3,
  Target, 
  Users, 
  Heart,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Home() {
  return (
    <div className={styles.main}>
      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <div className={`container animate-in`}>
          <div className={styles.badge}>Election 2024 • Intelligence for the Electorate</div>
          <h1 className={styles.title}>
            The Modern Way to <br />
            <span className="gradient-text">Navigate Democracy</span>
          </h1>
          <p className={styles.subtitle}>
            Chunav-Sarathi is an intelligent companion designed to simplify the voting journey. 
            From verifying eligibility to real-time AI assistance, we ensure your voice is heard with absolute clarity.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/dashboard">
              <Button size="lg" className="glow-on-hover">Get Started Now</Button>
            </Link>
            <a href="#features">
              <Button variant="secondary" size="lg">Explore Platform</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className="container">
          <div className={`${styles.sectionHeader} animate-in`}>
            <h2 className={styles.sectionTitle}>Everything for the Informed Voter</h2>
            <p className={styles.sectionSubtitle}>Smart tools built for the next generation of democracy.</p>
          </div>
          <div className={styles.featureGrid}>
            {[
              { path: '/features/eligibility', icon: <CheckCircle2 size={24} />, title: 'Eligibility Checker', desc: 'Instantly verify your registration status and find required documentation.' },
              { path: '/dashboard', icon: <Bot size={24} />, title: 'Gemini AI Assistant', desc: 'Real-time answers to complex voting queries, powered by state-of-the-art AI.' },
              { path: '/booth-locator', icon: <MapPin size={24} />, title: 'Booth Locator', desc: 'Find your designated polling station with precise maps and directions.' },
              { path: '/dashboard', icon: <ShieldCheck size={24} />, title: 'Secure Identity', desc: 'Your data is protected with enterprise-grade encryption and Firebase security.' }
            ].map((feature, i) => (
              <Link href={feature.path} key={i}>
                <Card className={`${styles.featureCard} glow-on-hover animate-in`} style={{animationDelay: `${i * 0.1}s`}}>
                  <div className={styles.iconWrapper}>{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                  <div className={styles.cardFooter}>
                    <span>Learn more</span>
                    <ChevronRight size={16} />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section id="pipeline" className={styles.pipeline}>
        <div className="container">
          <div className={`${styles.sectionHeader} animate-in`}>
            <h2 className={styles.sectionTitle}>The Election Timeline</h2>
            <p className={styles.sectionSubtitle}>Follow the pulse of the nation through every stage.</p>
          </div>
          
          <div className={styles.timelineContainer}>
            <div className={styles.animatedLine}></div>
            <div className={styles.timeline}>
              {[
                { title: 'Notification', icon: <Bell />, desc: 'Official schedule announcement by ECI.' },
                { title: 'Nomination', icon: <FileText />, desc: 'Candidate filing, scrutiny, and final list.' },
                { title: 'Campaigning', icon: <Megaphone />, desc: 'Parties share their visions with citizens.' },
                { title: 'Polling Day', icon: <CheckSquare />, desc: 'The most important day of the year.' },
                { title: 'Results', icon: <BarChart3 />, desc: 'The mandate of the people is declared.' },
              ].map((step, i) => (
                <div key={i} className={`${styles.timelineItem} animate-in`} style={{animationDelay: `${i * 0.15}s`}}>
                  <div className={styles.marker}>
                    <div className={styles.markerCircle}>{step.icon}</div>
                  </div>
                  <div className={styles.timelineContent}>
                    <div className={styles.stepNumber}>Step 0{i + 1}</div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={`${styles.aboutText} animate-in`}>
              <h2 className={styles.sectionTitle}>Our Vision for <br/>Democracy</h2>
              <p>
                Chunav-Sarathi was built on the belief that information is the foundation of a strong democracy. 
                We bridge the gap between complex official procedures and the everyday citizen through intelligent orchestration.
              </p>
              
              <div className={styles.techStackCard}>
                <div className={styles.techHeader}>
                  <Sparkles size={20} className={styles.techIcon} />
                  <h4>Technical Orchestration</h4>
                </div>
                <p>
                  This full web application is a showcase of <strong>Agentic Web Flow</strong>, architected and developed 
                  entirely using <strong>Google Gemini AI</strong>. Created for the <strong>Google Prompt War competition</strong>, 
                  it demonstrates the pinnacle of AI-driven development, where complex features like 3D mapping and 
                  multilingual support are harmonized into a premium, production-ready experience.
                </p>
              </div>

              <div className={styles.values}>
                <div className={styles.valueItem}>
                  <div className={styles.smallIcon}><Target size={18} /></div>
                  <span>Unbiased Information</span>
                </div>
                <div className={styles.valueItem}>
                  <div className={styles.smallIcon}><Users size={18} /></div>
                  <span>Citizen-First Design</span>
                </div>
                <div className={styles.valueItem}>
                  <div className={styles.smallIcon}><Heart size={18} /></div>
                  <span>Built for Impact</span>
                </div>
              </div>
            </div>
            <Card variant="glass" className={`${styles.aboutStats} animate-in`}>
              <div className={styles.statGlow}></div>
              <h3>Empowering Millions</h3>
              <p>Our platform aims to reduce voter confusion by over 90% through clear, guided pathways.</p>
              <Link href="/dashboard">
                <Button fullWidth className="glow-on-hover">Join the Movement</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
