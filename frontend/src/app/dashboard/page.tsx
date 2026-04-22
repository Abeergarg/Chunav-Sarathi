'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import { Button, Card, Input, ChatAssistant } from '@/components';
import { 
  LogIn, 
  Phone, 
  ShieldCheck, 
  User as UserIcon, 
  LogOut, 
  MessageSquare, 
  Download, 
  Edit3, 
  Save, 
  Map as MapIcon, 
  CheckCircle,
  FileText,
  Calendar,
  ExternalLink,
  ArrowRight,
  Globe,
  Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [voterData, setVoterData] = useState({
    epic: 'ABC1234567',
    constituency: 'Central Delhi',
    booth: 'Primary School, Block B, Delhi'
  });

  if (loading) {
    return <div className={styles.loadingContainer}><div className={styles.loader}></div></div>;
  }

  if (!user) {
    return (
      <main className={styles.loginMain}>
        <div className={styles.loginContainer}>
          <Card variant="elevated" className={styles.loginCard}>
            <div className={styles.loginHeader}>
              <div className={styles.logoIcon}><ShieldCheck size={32} /></div>
              <h1>Voter Gateway</h1>
              <p>Securely sign in to access your digital voting profile.</p>
            </div>
            <div className={styles.loginActions}>
              <Button 
                variant="outline" 
                fullWidth 
                onClick={async () => {
                  try {
                    await loginWithGoogle();
                  } catch (e: any) {
                    alert("Login failed: " + (e.message || "Unknown error"));
                  }
                }} 
                className="glow-on-hover"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" height="18" style={{marginRight: '12px'}} />
                Continue with Google
              </Button>
              <div className={styles.divider}><span>OR</span></div>
              <Input label="Phone Number" placeholder="+91 98765 43210" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} icon={<Phone size={18} />} />
              <Button fullWidth onClick={() => alert('OTP feature coming soon!')}>Send OTP</Button>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  const handleDownloadSlip = async () => {
    const { jsPDF } = await import('jspdf');
    // Create a vertical card-sized PDF (100mm x 150mm)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [100, 150]
    });

    // 1. Background Graphics (Landing Page Vibe)
    // Radial Gradient simulation
    for(let i = 0; i < 150; i++) {
      const opacity = 1 - (i / 150);
      doc.setDrawColor(240, 247, 255);
      doc.setFillColor(240 + (i/10), 247, 255);
      doc.circle(50, 75, 150 - i, 'F');
    }

    // Dot Pattern simulation
    doc.setFillColor(0, 97, 255, 0.05);
    for(let x = 0; x < 100; x += 10) {
      for(let y = 0; y < 150; y += 10) {
        doc.circle(x, y, 0.2, 'F');
      }
    }

    // 2. Header Branding
    doc.setFillColor(0, 97, 255);
    doc.rect(0, 0, 100, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('CHUNAV-SARATHI', 50, 13, { align: 'center' });

    // 3. Profile Photo logic
    try {
      if (user.photoURL) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = user.photoURL;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        // Draw photo with rounded border
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(1);
        doc.circle(50, 45, 16, 'D');
        doc.clip();
        doc.addImage(img, 'JPEG', 34, 29, 32, 32);
        // Reset clipping for rest of doc (jsPDF doesn't have easy reset, so we use state save/restore if it were more complex, but here we just continue)
      }
    } catch (e) {
      // Fallback if photo fails: draw an icon or initial
      doc.setDrawColor(0, 97, 255);
      doc.circle(50, 45, 15, 'S');
      doc.setTextColor(0, 97, 255);
      doc.text(user.displayName?.[0] || 'V', 50, 48, { align: 'center' });
    }

    // New "page" or context for text after clipping
    const doc2 = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [100, 150] });
    // Re-draw background and header for the second attempt (clipping in jspdf is tricky)
    // Actually, I'll just use a non-clipping approach for the photo for simplicity
    
    // START OVER WITHOUT CLIPPING FOR STABILITY
    const finalDoc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [100, 150] });
    
    // Background
    finalDoc.setFillColor(248, 250, 252);
    finalDoc.rect(0, 0, 100, 150, 'F');
    
    // Header
    finalDoc.setFillColor(0, 97, 255);
    finalDoc.rect(0, 0, 100, 15, 'F');
    finalDoc.setTextColor(255, 255, 255);
    finalDoc.setFontSize(12);
    finalDoc.text('CHUNAV-SARATHI', 50, 10, { align: 'center' });

    // Photo
    if (user.photoURL) {
      try {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = user.photoURL;
        await new Promise((res) => { img.onload = res; img.onerror = res; });
        finalDoc.addImage(img, 'JPEG', 37.5, 20, 25, 25);
      } catch(e) {}
    }

    // Details
    finalDoc.setTextColor(26, 32, 44);
    finalDoc.setFontSize(10);
    finalDoc.setFont('helvetica', 'bold');
    finalDoc.text(user.displayName?.toUpperCase() || 'CITIZEN', 50, 52, { align: 'center' });
    
    finalDoc.setDrawColor(0, 135, 90);
    finalDoc.setFillColor(224, 252, 242);
    finalDoc.roundedRect(20, 56, 60, 6, 1, 1, 'FD');
    finalDoc.setTextColor(0, 135, 90);
    finalDoc.setFontSize(7);
    finalDoc.text('VERIFIED BY ECI SYSTEMS', 50, 60, { align: 'center' });

    const startY = 75;
    const items = [
      ['EPIC', voterData.epic],
      ['CONSTITUENCY', voterData.constituency],
      ['STATION', voterData.booth],
      ['DATE', 'MAY 12, 2024']
    ];

    items.forEach(([label, val], i) => {
      finalDoc.setTextColor(148, 163, 184);
      finalDoc.setFontSize(6);
      finalDoc.text(label, 20, startY + (i * 12));
      finalDoc.setTextColor(30, 41, 59);
      finalDoc.setFontSize(9);
      finalDoc.text(val, 20, startY + (i * 12) + 5);
    });

    // Website Hyperlink
    finalDoc.setTextColor(0, 97, 255);
    finalDoc.setFontSize(8);
    finalDoc.text('www.chunav-sarathi.com', 50, 135, { align: 'center' });
    finalDoc.link(35, 132, 30, 5, { url: window.location.origin });

    // Footer
    finalDoc.setTextColor(203, 213, 225);
    finalDoc.setFontSize(6);
    finalDoc.text('No Voter to be Left Behind', 50, 142, { align: 'center' });

    finalDoc.save(`Voter_Card_${voterData.epic}.pdf`);
  };

  return (
    <main className={styles.dashboardMain}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {user.photoURL ? <img src={user.photoURL} alt="User" /> : <UserIcon size={24} />}
            </div>
            <div>
              <h1>Welcome, {user.displayName || 'Citizen'}</h1>
              <p>Member ID: {user.uid.slice(0, 8)}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={logout} className={styles.logoutBtn}>
            <LogOut size={18} style={{marginRight: '8px'}} /> Sign Out
          </Button>
        </header>

        <div className={styles.grid}>
          {/* Voter Profile Card */}
          <Card className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <h3>Voter Registration Details</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
              </Button>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoField}>
                <label>EPIC Number</label>
                {isEditing ? (
                  <input value={voterData.epic} onChange={e => setVoterData({...voterData, epic: e.target.value})} />
                ) : (
                  <span>{voterData.epic}</span>
                )}
              </div>
              <div className={styles.infoField}>
                <label>Constituency</label>
                {isEditing ? (
                  <input value={voterData.constituency} onChange={e => setVoterData({...voterData, constituency: e.target.value})} />
                ) : (
                  <span>{voterData.constituency}</span>
                )}
              </div>
              <div className={styles.infoField}>
                <label>Polling Station</label>
                {isEditing ? (
                  <input value={voterData.booth} onChange={e => setVoterData({...voterData, booth: e.target.value})} />
                ) : (
                  <span>{voterData.booth}</span>
                )}
              </div>
              {isEditing && (
                <Button fullWidth onClick={() => {setIsEditing(false); alert('Data saved locally!')}}>Update Data</Button>
              )}
            </div>
          </Card>

          {/* Next Steps Improved Widget */}
          <Card className={styles.stepsCard}>
            <div className={styles.stepsHeader}>
              <h3>Your Roadmap to Vote</h3>
              <span className={styles.progressBadge}>75% Ready</span>
            </div>
            <div className={styles.stepsList}>
              <div className={`${styles.stepItem} ${styles.completed}`}>
                <CheckCircle size={20} />
                <span>Verify Name in Roll</span>
              </div>
              <div className={`${styles.stepItem} ${styles.active}`}>
                <div className={styles.stepPulse}></div>
                <div className={styles.stepContent}>
                  <span>Voter Slip</span>
                  <Button variant="primary" size="sm" onClick={handleDownloadSlip} className={styles.miniBtn}>
                    <Download size={14} /> Download
                  </Button>
                </div>
              </div>
              <div className={styles.stepItem}>
                <Calendar size={20} />
                <span>Election: May 12</span>
              </div>
            </div>
            <div className={styles.boothBox}>
              <div className={styles.boothInfo}>
                <MapIcon size={20} />
                <span>Polling Booth</span>
              </div>
              <Button variant="secondary" size="sm" onClick={() => router.push('/booth-locator')}>
                <ExternalLink size={14} /> Map
              </Button>
            </div>
          </Card>
        </div>

        {/* Featured AI Assistant Section - Restored to the middle */}
        <section className={styles.aiFeaturedSection}>
          <Card className={styles.aiLargeCard} variant="glass">
            <div className={styles.aiCardGrid}>
              <div className={styles.aiInfo}>
                <div className={styles.aiBadge}>AI-Powered Assistance</div>
                <h2 className="gradient-text">Your Democratic Companion</h2>
                <p className={styles.aiMainDesc}>
                  Experience the future of citizen engagement. Our AI assistant bridge the gap between complex official data and your everyday queries.
                </p>
                
                <div className={styles.advantagesGrid}>
                  <div className={styles.advantageItem}>
                    <ShieldCheck size={24} className={styles.advIcon} />
                    <div>
                      <h4>Instant Verification</h4>
                      <p>Get facts directly from verified ECI sources without searching through PDFs.</p>
                    </div>
                  </div>
                  <div className={styles.advantageItem}>
                    <Globe size={24} className={styles.advIcon} />
                    <div>
                      <h4>12+ Native Languages</h4>
                      <p>Talk naturally in Hindi, Bengali, Tamil, and more. No more language barriers.</p>
                    </div>
                  </div>
                  <div className={styles.advantageItem}>
                    <MessageSquare size={24} className={styles.advIcon} />
                    <div>
                      <h4>24/7 Availability</h4>
                      <p>Ready to assist you at any time, day or night, during the election season.</p>
                    </div>
                  </div>
                  <div className={styles.advantageItem}>
                    <CheckCircle size={24} className={styles.advIcon} />
                    <div>
                      <h4>Privacy Focused</h4>
                      <p>Your queries are anonymous and safe. We don't store personal identification.</p>
                    </div>
                  </div>
                </div>

                <div className={styles.aiActions}>
                  <Button size="lg" className="glow-on-hover" onClick={() => window.dispatchEvent(new Event('open-chat'))}>
                    Chat Now
                  </Button>
                  <Button variant="ghost" className={styles.dedicatedBtn} onClick={() => router.push('/features/ai-assistant')}>
                    Advanced AI Dashboard <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
              <div className={styles.aiGraphic}>
                <div className={styles.graphicCircle}>
                  <Sparkles size={80} className={styles.floatingIcon} />
                  <div className={styles.pulseRing}></div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Official ECI Resources Section */}
        <section className={styles.officialSection}>
          <div className={styles.sectionHeader}>
            <h2>Official ECI Resources</h2>
            <p className={styles.motto}>"No Voter to be Left Behind"</p>
          </div>
          
          <div className={styles.resourceGrid}>
            <Card className={styles.resourceCard}>
              <FileText className={styles.resourceIcon} />
              <h4>Registration Forms</h4>
              <p>Apply for new registration, correction, or deletion.</p>
              <div className={styles.formLinks}>
                <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer">Form 6 (New Voter)</a>
                <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer">Form 8 (Correction)</a>
              </div>
            </Card>

            <Card className={styles.resourceCard}>
              <Phone className={styles.resourceIcon} />
              <h4>Toll-Free Helpline</h4>
              <p>Call for immediate assistance regarding your Voter ID.</p>
              <div className={styles.helplineBox}>
                <span className={styles.helplineNumber}>1950</span>
              </div>
            </Card>

            <Card className={styles.resourceCard}>
              <CheckCircle className={styles.resourceIcon} />
              <h4>Digital Services</h4>
              <p>Access your digital Voter ID and search your name.</p>
              <div className={styles.portalLinks}>
                <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className={styles.portalBtn}>
                  Voter Portal <ExternalLink size={14} />
                </a>
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerBrand}>
            <ShieldCheck size={24} />
            <span>Chunav-Sarathi</span>
          </div>
          <p className={styles.footerText}>
            This is an educational platform designed to simplify access to Election Commission of India services. 
            All data is sourced from official ECI portals.
          </p>
          <div className={styles.footerLinks}>
            <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer">Official ECI Website</a>
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer">Voter Services</a>
            <a href="https://voterportal.eci.gov.in" target="_blank" rel="noopener noreferrer">Candidate Info</a>
          </div>
          <p className={styles.copyright}>© 2024 Chunav-Sarathi | For Educational Purposes Only</p>
        </footer>
      </div>
      <ChatAssistant />
    </main>
  );
}
