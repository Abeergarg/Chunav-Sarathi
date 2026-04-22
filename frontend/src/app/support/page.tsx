import React from 'react';
import styles from '../privacy/page.module.css';
import { Button, Input } from '@/components';
import { Mail, MessageCircle } from 'lucide-react';

export default function SupportPage() {
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.header}>
          <h1 className="gradient-text">How can we help?</h1>
          <p>Get in touch with our support team or browse our resources.</p>
        </div>
        <div className={styles.content}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <div style={{background: 'rgba(0, 97, 255, 0.1)', color: 'var(--primary-color)', padding: '1rem', borderRadius: '50%'}}>
                <Mail size={24} />
              </div>
              <div>
                <h3>Email Us</h3>
                <p>support@chunav-sarathi.com</p>
              </div>
            </div>
            
            <hr style={{border: 'none', borderBottom: '1px solid var(--border-color)'}} />
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              <h3>Send us a message</h3>
              <Input label="Name" placeholder="Your name" />
              <Input label="Email" placeholder="Your email" />
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <label style={{fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)'}}>Message</label>
                <textarea 
                  style={{width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', minHeight: '150px', outline: 'none'}}
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <Button fullWidth>Submit Request</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
