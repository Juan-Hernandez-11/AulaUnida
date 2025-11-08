"use client";

import styles from '../../styles/landing/AboutSection.module.css';

export default function AboutSection() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Transformando la Educación Digital
          </h2>
          <p className={styles.sectionSubtitle}>
            AulaUnida es la plataforma educativa que está revolucionando la gestión académica,
            diseñada para potenciar el aprendizaje y conectar comunidades educativas modernas.
          </p>
        </div>

        <div className={styles.aboutGrid}>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <h3 className={styles.aboutTitle}>
                Una Plataforma, Múltiples Posibilidades
              </h3>
              <p className={styles.aboutDescription}>
                En AulaUnida hemos creado un ecosistema digital integral que conecta a toda 
                la comunidad educativa moderna. Desde estudiantes que consultan sus notas 
                hasta administradores que gestionan programas académicos, nuestra plataforma 
                ofrece herramientas innovadoras y eficientes para cada rol educativo.
              </p>

              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Gestión Académica Completa</h4>
                    <p>Control total de notas, asistencia, horarios y programas académicos en tiempo real.</p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 21V19C23 18.1645 22.7361 17.3541 22.2447 16.6977C21.7533 16.0414 21.0641 15.5759 20.2627 15.3725" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 18.0078 6.11683 17.0078 6.3175" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Comunidad Conectada</h4>
                    <p>Estudiantes, docentes y administradores trabajando juntos en un entorno digital unificado.</p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Tecnología de Vanguardia</h4>
                    <p>Interfaz moderna, responsive y optimizada para todos los dispositivos y navegadores.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.aboutVisual}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>24/7</div>
                <div className={styles.statLabel}>Disponibilidad</div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statNumber}>99.9%</div>
                <div className={styles.statLabel}>Uptime</div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Cloud</div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statNumber}>Secure</div>
                <div className={styles.statLabel}>SSL/TLS</div>
              </div>
            </div>

            <div className={styles.visualDecoration}>
              <div className={styles.decorationCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className={styles.cardTitle}>Panel de Control</span>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{width: '85%'}}></div>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{width: '92%'}}></div>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{width: '78%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.institutionalInfo}>
          <div className={styles.logoSection}>
            <div className={styles.institutionalLogo}>
              <div className={styles.logoIcon}>AU</div>
              <div className={styles.logoText}>
                <h4>AulaUnida</h4>
                <p>Plataforma Educativa Líder</p>
              </div>
            </div>
          </div>
          
          <div className={styles.infoText}>
            <p>
              AulaUnida es una empresa de tecnología educativa comprometida con la 
              transformación digital de las instituciones de educación. Nuestra plataforma 
              representa el futuro de la gestión académica, combinando innovación tecnológica 
              con excelencia en la experiencia de usuario.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}