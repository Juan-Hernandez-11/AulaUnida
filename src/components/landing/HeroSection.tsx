"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/landing/HeroSection.module.css';

export default function HeroSection() {
  const [currentText, setCurrentText] = useState(0);
  
  const heroTexts = [
    "Gestión Académica Integral",
    "Educación del Futuro",
    "Tecnología Educativa Avanzada"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroTexts.length]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Bienvenido a{' '}
              <span className={styles.brandName}>AulaUnida</span>
            </h1>
            
            <div className={styles.heroSubtitle}>
              <span className={styles.animatedText} key={currentText}>
                {heroTexts[currentText]}
              </span>
            </div>
            
            <p className={styles.heroDescription}>
              La plataforma educativa líder que revoluciona la gestión académica. 
              Conectamos estudiantes, docentes y administradores en un ecosistema 
              digital intuitivo, potente y escalable para instituciones educativas modernas.
            </p>
            
            <div className={styles.heroActions}>
              <Link href="/login" className={styles.primaryBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 3H6C5.46957 3 4.96086 3.21071 4.58579 3.58579C4.21071 3.96086 4 4.46957 4 5V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Acceder al Sistema
              </Link>
              
              <a href="#about" className={styles.secondaryBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9.09 9A3 3 0 0 1 12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Conocer Más
              </a>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.dashboardPreview}>
              <div className={styles.previewHeader}>
                <div className={styles.previewDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className={styles.previewTitle}>AulaUnida Dashboard</span>
              </div>
              
              <div className={styles.previewContent}>
                <div className={styles.previewSidebar}>
                  <div className={styles.sidebarItem}></div>
                  <div className={styles.sidebarItem}></div>
                  <div className={styles.sidebarItem}></div>
                  <div className={styles.sidebarItem}></div>
                </div>
                
                <div className={styles.previewMain}>
                  <div className={styles.mainCard}>
                    <div className={styles.cardHeader}></div>
                    <div className={styles.cardContent}>
                      <div className={styles.contentLine}></div>
                      <div className={styles.contentLine}></div>
                      <div className={styles.contentLine}></div>
                    </div>
                  </div>
                  
                  <div className={styles.mainCard}>
                    <div className={styles.cardHeader}></div>
                    <div className={styles.cardContent}>
                      <div className={styles.contentLine}></div>
                      <div className={styles.contentLine}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Elementos decorativos flotantes */}
            <div className={styles.floatingElements}>
              <div className={styles.floatingIcon} style={{top: '20%', left: '10%', animationDelay: '0s'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 10V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 20H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div className={styles.floatingIcon} style={{top: '60%', right: '15%', animationDelay: '1s'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div className={styles.floatingIcon} style={{top: '80%', left: '20%', animationDelay: '2s'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4V10C16 10.5304 16.2107 11.0391 16.5858 11.4142C16.9609 11.7893 17.4696 12 18 12H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2H16L22 8V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollText}>Explora más</div>
          <div className={styles.scrollArrow}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L12 18L17 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className={styles.backgroundDecoration}>
        <div className={styles.gradientBlob} style={{top: '10%', left: '80%'}}></div>
        <div className={styles.gradientBlob} style={{bottom: '20%', left: '10%'}}></div>
      </div>
    </section>
  );
}