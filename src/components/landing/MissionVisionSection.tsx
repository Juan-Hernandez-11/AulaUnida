"use client";

import styles from '../../styles/landing/MissionVisionSection.module.css';

export default function MissionVisionSection() {
  return (
    <section className={styles.missionVisionSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Nuestra Filosofía Empresarial
          </h2>
          <p className={styles.sectionSubtitle}>
            Los principios que guían nuestro compromiso con la innovación educativa
          </p>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.missionCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Nuestra Misión</h3>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardText}>
                Revolucionar la educación a través de tecnología innovadora, creando 
                soluciones digitales que conecten, faciliten y potencien el aprendizaje 
                en instituciones educativas de todo el mundo. Desarrollamos herramientas 
                intuitivas que transforman la gestión académica y fortalecen las 
                comunidades educativas del futuro.
              </p>
            </div>
          </div>

          <div className={styles.visionCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Nuestra Visión</h3>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardText}>
                Ser la plataforma educativa líder a nivel global, reconocida por su 
                innovación tecnológica, facilidad de uso y capacidad de transformar 
                positivamente la experiencia educativa. AulaUnida será el estándar 
                mundial en soluciones digitales para la gestión académica y el 
                aprendizaje colaborativo.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.valuesSection}>
          <h3 className={styles.valuesTitle}>Nuestros Valores</h3>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className={styles.valueTitle}>Excelencia</h4>
              <p className={styles.valueDescription}>
                Compromiso constante con la calidad en todos nuestros procesos educativos y tecnológicos.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className={styles.valueTitle}>Innovación</h4>
              <p className={styles.valueDescription}>
                Adopción de tecnologías emergentes para mejorar continuamente la experiencia educativa.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C23 18.1645 22.7361 17.3541 22.2447 16.6977C21.7533 16.0414 21.0641 15.5759 20.2627 15.3725" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 18.0078 6.11683 17.0078 6.3175" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className={styles.valueTitle}>Inclusión</h4>
              <p className={styles.valueDescription}>
                Garantizamos acceso equitativo a la educación para toda nuestra comunidad académica.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22S2 16 2 8C2 6.14348 2.73749 4.36301 4.05025 3.05025C5.36301 1.73749 7.14348 1 9 1C10.0929 1 11.1175 1.29568 12 1.82" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 1.82C12.8825 1.29568 13.9071 1 15 1C16.8565 1 18.637 1.73749 19.9497 3.05025C21.2625 4.36301 22 6.14348 22 8C22 16 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className={styles.valueTitle}>Integridad</h4>
              <p className={styles.valueDescription}>
                Actuamos con transparencia, honestidad y responsabilidad en todas nuestras acciones.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 14S9.5 16 12 16S16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className={styles.valueTitle}>Servicio</h4>
              <p className={styles.valueDescription}>
                Orientamos nuestros esfuerzos hacia la satisfacción y el éxito de nuestros estudiantes.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className={styles.valueTitle}>Sostenibilidad</h4>
              <p className={styles.valueDescription}>
                Promovemos prácticas responsables que contribuyan al desarrollo sostenible del planeta.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.commitmentSection}>
          <div className={styles.commitmentContent}>
            <div className={styles.commitmentText}>
              <h3 className={styles.commitmentTitle}>
                Nuestro Compromiso con la Innovación Educativa
              </h3>
              <p className={styles.commitmentDescription}>
                En AulaUnida, entendemos que la tecnología es la clave para democratizar 
                el acceso a la educación de calidad. Nuestra plataforma representa el 
                futuro de la gestión académica, ofreciendo soluciones que conectan, 
                facilitan y potencian el aprendizaje en la era digital.
              </p>
              <div className={styles.commitmentStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>24/7</span>
                  <span className={styles.statLabel}>Soporte técnico</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>100%</span>
                  <span className={styles.statLabel}>Cloud-native</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>99.9%</span>
                  <span className={styles.statLabel}>Disponibilidad</span>
                </div>
              </div>
            </div>
            <div className={styles.commitmentVisual}>
              <div className={styles.visualIcon}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}