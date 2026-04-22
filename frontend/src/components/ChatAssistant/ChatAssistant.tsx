'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatAssistant.module.css';
import { Card, Button } from '@/components';
import { Send, User, X, Globe, Volume2, VolumeX, ShieldCheck, Sparkles, Info, AlertCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

const LANGUAGES = [
  { code: 'en', name: 'English', speechCode: 'en-IN' },
  { code: 'hi', name: 'हिन्दी (Hindi)', speechCode: 'hi-IN' },
  { code: 'bn', name: 'বাংলা (Bengali)', speechCode: 'bn-IN' },
  { code: 'te', name: 'తెలుగు (Telugu)', speechCode: 'te-IN' },
  { code: 'ta', name: 'தமிழ் (Tamil)', speechCode: 'ta-IN' },
  { code: 'mr', name: 'మరాठी (Marathi)', speechCode: 'mr-IN' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', speechCode: 'gu-IN' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', speechCode: 'kn-IN' },
  { code: 'ml', name: 'മലയാളം (Malayalam)', speechCode: 'ml-IN' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', speechCode: 'pa-IN' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)', speechCode: 'or-IN' },
  { code: 'ur', name: 'اردو (Urdu)', speechCode: 'ur-PK' },
];

const SUGGESTIONS = [
  "How to register for a new Voter ID?",
  "Check my polling station location",
  "Download my Voter Slip",
  "What are the election dates?"
];

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangSelect, setShowLangSelect] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [isTTSActive, setIsTTSActive] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Namaste! I am your Chunav-Sarathi AI. I can help you with voting registration, polling station info, and electoral processes in 12+ Indian languages.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mascotImg = "/mascot.png";

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handlePrompt = (e: any) => {
      setIsOpen(true);
      setShowLangSelect(false);
      handleSend(e.detail);
    };
    
    window.addEventListener('open-chat', handleOpen);
    window.addEventListener('chat-prompt', handlePrompt);
    return () => {
      window.removeEventListener('open-chat', handleOpen);
      window.removeEventListener('chat-prompt', handlePrompt);
    };
  }, [selectedLang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleLangSelect = (code: string, name: string) => {
    setSelectedLang(code);
    setShowLangSelect(false);
    const welcomeMsg = `Language set to ${name}. How can I assist you today?`;
    setMessages(prev => [...prev, { role: 'assistant', content: welcomeMsg }]);
    if (isTTSActive) speakText(welcomeMsg, code);
  };

  const speakText = (text: string, langCode: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langConfig = LANGUAGES.find(l => l.code === langCode);
    const targetSpeechCode = langConfig?.speechCode || 'en-IN';
    utterance.lang = targetSpeechCode;
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(v => v.lang === targetSpeechCode) ||
                        voices.find(v => v.lang.startsWith(langCode)) ||
                        voices.find(v => v.name.toLowerCase().includes(langConfig?.name.toLowerCase() || ''));
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (customMsg?: string) => {
    const textToSend = customMsg || input;
    if (!textToSend.trim() || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, language: selectedLang }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Service Unavailable');
      }

      if (data.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
        if (isTTSActive) speakText(data.text, selectedLang);
      } else {
        throw new Error('Malformed response from AI');
      }
    } catch (error: any) {
      console.error('Chat Error:', error);
      const isBusy = error.message.toLowerCase().includes('demand') || error.message.toLowerCase().includes('busy');
      const friendlyError = isBusy 
        ? "I'm currently assisting many citizens. Please wait a moment or try again later."
        : `I'm having trouble connecting: ${error.message}. Please try again shortly.`;
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: friendlyError,
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button className={styles.launcher} onClick={() => setIsOpen(true)}>
        <div className={styles.launcherMascot}>
          <Image src={mascotImg} alt="Mascot" width={52} height={52} />
        </div>
        <div className={styles.launcherInfo}>
          <span className={styles.launcherStatus}>Online</span>
          <span className={styles.launcherTitle}>Ask AI</span>
        </div>
      </button>
    );
  }

  return (
    <Card variant="glass" className={styles.chatContainer}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.mascotCircle}>
            <Image src={mascotImg} alt="Mascot" width={32} height={32} />
          </div>
          <div className={styles.titleGroup}>
            <span className={styles.titleName}>Chunav-Sarathi AI</span>
            <span className={styles.titleStatus}><span className={styles.statusDot}></span> Active</span>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.headerBtn} onClick={() => setShowInfo(!showInfo)} title="About AI">
            <Info size={18} />
          </button>
          <button className={styles.headerBtn} onClick={() => setIsTTSActive(!isTTSActive)}>
            {isTTSActive ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button className={styles.headerBtn} onClick={() => setShowLangSelect(true)}>
            <Globe size={18} />
          </button>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div className={styles.messages}>
        {showInfo && (
          <div className={styles.infoOverlay}>
            <Sparkles className={styles.infoIcon} />
            <h4>The Brain of Chunav-Sarathi</h4>
            <p>I am an advanced AI trained exclusively on verified Election Commission of India data to guide you through the democratic process.</p>
            <ul className={styles.infoList}>
              <li><strong>Absolute Accuracy:</strong> Only official ECI sources are used.</li>
              <li><strong>No Language Barrier:</strong> Support for 12+ native Indian languages.</li>
              <li><strong>Inclusive Design:</strong> Integrated voice-to-text and screen reader support.</li>
              <li><strong>Privacy First:</strong> Your queries are processed anonymously.</li>
            </ul>
            <Button size="sm" onClick={() => setShowInfo(false)}>Start Exploring</Button>
          </div>
        )}

        {showLangSelect && (
          <div className={styles.langOverlay}>
            <div className={styles.welcomeHead}>
              <Sparkles size={24} className={styles.welcomeIcon} />
              <h4>Choose Language</h4>
            </div>
            <div className={styles.langGrid}>
              {LANGUAGES.map(lang => (
                <button key={lang.code} className={styles.langChip} onClick={() => handleLangSelect(lang.code, lang.name)}>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`${styles.messageWrapper} ${styles[msg.role]} ${msg.isError ? styles.errorMsg : ''}`}>
            <div className={styles.avatar}>
              {msg.role === 'assistant' ? 
                <Image src={mascotImg} alt="M" width={24} height={24} /> : 
                <User size={16} />
              }
            </div>
            <div className={styles.messageContent}>
              {msg.isError && <AlertCircle size={14} className={styles.errorIcon} />}
              {msg.content}
            </div>
          </div>
        ))}
        
        {messages.length < 3 && !isLoading && (
          <div className={styles.suggestions}>
            <p>Try asking:</p>
            {SUGGESTIONS.map((s, i) => (
              <button key={i} className={styles.suggestionBtn} onClick={() => handleSend(s)}>
                {s} <ArrowRight size={12} />
              </button>
            ))}
          </div>
        )}

        {isLoading && (
          <div className={`${styles.messageWrapper} ${styles.assistant}`}>
            <div className={styles.avatar}><Image src={mascotImg} alt="M" width={24} height={24} /></div>
            <div className={styles.messageContent}>
              <div className={styles.typing}><span></span><span></span><span></span></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Ask your voting query..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className={styles.input}
          />
          <button 
            className={styles.sendBtn} 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
          >
            <Send size={18} />
          </button>
        </div>
        <div className={styles.footerNote}>
          <ShieldCheck size={12} /> Official ECI Support Data
        </div>
      </div>
    </Card>
  );
};
