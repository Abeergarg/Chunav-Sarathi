'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './NavBar.module.css';
import { Button } from '@/components';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <span className="gradient-text">Chunav-Sarathi</span>
        </Link>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links */}
        <div className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
          <a href="/#features" className={styles.link} onClick={() => setIsOpen(false)}>Features</a>
          <a href="/#pipeline" className={styles.link} onClick={() => setIsOpen(false)}>Pipeline</a>
          <a href="/#about" className={styles.link} onClick={() => setIsOpen(false)}>About</a>
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            <Button variant="primary" size="sm" fullWidth className={styles.dashBtn}>
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile Overlay */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
}
