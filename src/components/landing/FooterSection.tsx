"use client";

import Link from 'next/link';
import styles from '../../styles/landing/FooterSection.module.css';

export default function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Branding Section */}
          <div className={styles.brandSection}>
            <div className={styles.brand}>
              <div className={styles.logo}>
                <div className={styles.logoIcon}>
                  <span>AU</span>
                </div>
                <div className={styles.logoText}>
                  <h3>AulaUnida</h3>
                  <p>Plataforma Educativa CUN</p>
                </div>
              </div>
              <p className={styles.brandDescription}>
                La plataforma educativa líder que está revolucionando la gestión académica 
                mundial. Conectamos, facilitamos y potenciamos el aprendizaje en instituciones 
                educativas modernas a través de tecnología innovadora.
              </p>
              <div className={styles.socialLinks}>
                <a href="https://www.facebook.com/aulaunida" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/aulaunida/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7616 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12581 14.2649 8.52407 14.8717 9.13088C15.4785 9.73769 15.8768 10.5237 16.0026 11.3726" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/aulaunida/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/c/AulaUnida" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.4981 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4S5.12 4 3.4 4.46C2.92918 4.59318 2.50185 4.84824 2.16124 5.19941C1.82063 5.55057 1.57875 5.98541 1.46 6.46C1.14258 8.20556 0.991371 9.97631 1.01 11.75C0.988031 13.537 1.13717 15.3213 1.46 17.08C1.59237 17.5398 1.8379 17.9581 2.17774 18.2945C2.51758 18.6308 2.93842 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46S18.88 19.46 20.6 19C21.0708 18.8668 21.4981 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8574 15.2544 23.0086 13.4837 22.99 11.71C23.012 9.92269 22.8628 8.13837 22.54 6.42Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h4 className={styles.sectionTitle}>Enlaces Rápidos</h4>
            <ul className={styles.linksList}>
              <li><Link href="/login" className={styles.footerLink}>Iniciar Sesión</Link></li>
              <li><Link href="/estudiante" className={styles.footerLink}>Portal Estudiante</Link></li>
              <li><Link href="/docente" className={styles.footerLink}>Portal Docente</Link></li>
              <li><Link href="/admin" className={styles.footerLink}>Portal Administrador</Link></li>
              <li><a href="https://www.aulaunida.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Sitio Web Oficial</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className={styles.supportSection}>
            <h4 className={styles.sectionTitle}>Soporte y Ayuda</h4>
            <ul className={styles.linksList}>
              <li><a href="#" className={styles.footerLink}>Centro de Ayuda</a></li>
              <li><a href="#" className={styles.footerLink}>Guías y Tutoriales</a></li>
              <li><a href="#" className={styles.footerLink}>Reportar Problema</a></li>
              <li><a href="#" className={styles.footerLink}>Estado del Sistema</a></li>
              <li><a href="#" className={styles.footerLink}>Términos de Uso</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className={styles.contactSection}>
            <h4 className={styles.sectionTitle}>Información de Contacto</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.contactLabel}>Dirección Principal</p>
                  <p className={styles.contactValue}>Cra 10#23A-05 - Barrio El pinar, Sincelejo-Sucre</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9448 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.contactLabel}>Teléfono Principal</p>
                  <p className={styles.contactValue}>+57 3008148295</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.contactLabel}>Email Soporte</p>
                  <p className={styles.contactValue}>soporte@aulaunida.com</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.contactLabel}>Horario de Atención</p>
                  <p className={styles.contactValue}>Lun - Vie: 7:00 AM - 9:00 PM</p>
                  <p className={styles.contactValue}>Sáb: 7:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <div className={styles.copyright}>
              <p>&copy; 2024 AulaUnida Technologies. Todos los derechos reservados.</p>
              <p>Plataforma Educativa Líder en Innovación</p>
            </div>
            <div className={styles.certifications}>
              <div className={styles.certBadge}>
                <span>Certificada</span>
                <strong>ISO 27001</strong>
              </div>
              <div className={styles.certBadge}>
                <span>Seguridad</span>
                <strong>SOC 2</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}