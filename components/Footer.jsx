import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <div className={styles.brand}>
            <span className={styles.mark} aria-hidden />
            <span className={styles.word}>Aquamarine</span>
          </div>
          <p className={styles.tag}>
            Ayia Napa villas &amp; suites, managed by the people who own them.
          </p>
          <div className={styles.socials}>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener">
              <Ig />
            </a>
            <a href="https://wa.me/35797494941" aria-label="WhatsApp" target="_blank" rel="noopener">
              <Wa />
            </a>
            <a href="mailto:info@aquamarine365.com" aria-label="Email">
              <Mail />
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <h4>Contact</h4>
          <p><a href="tel:+35797494941">+357 97 494 941</a></p>
          <p><a href="mailto:info@aquamarine365.com">info@aquamarine365.com</a></p>
          <p>61 Tefkrou Anthia<br />Ayia Napa 5330, Cyprus</p>
        </div>

        <div className={styles.col}>
          <h4>Stays</h4>
          <p><Link href="/stays/ocean-dreams-suites">Ocean Dreams Suites</Link></p>
          <p><Link href="/stays/dream-tropicana-villa">Dream Tropicana Villa</Link></p>
          <p><Link href="/stays/valerian-palm-villa">Valerian Palm Villa</Link></p>
        </div>

        <div className={styles.col}>
          <h4>Trust</h4>
          <p>Licensed CY-DMT 2024</p>
          <p>GDPR compliant</p>
          <p>Secure payments · Stripe</p>
        </div>
      </div>

      <div className={`container ${styles.base}`}>
        <small>© {new Date().getFullYear()} Aquamarine Holiday Rentals. All rights reserved.</small>
        <small>
          <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">House rules</a>
        </small>
      </div>
    </footer>
  );
}

function Ig() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function Wa() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 12a8 8 0 1 0-14.2 5.1L4 21l4-1.8A8 8 0 0 0 20 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 10c.5 2 2 3.5 4 4l1.2-1a.6.6 0 0 1 .6-.1l1.6.6a.5.5 0 0 1 .3.6c-.3 1.2-1.5 2-2.8 1.9-2.8-.2-5.4-2.7-5.6-5.5a2 2 0 0 1 1.9-2 .5.5 0 0 1 .6.4l.5 1.5c0 .2 0 .4-.2.6L9 10Z" fill="currentColor" />
    </svg>
  );
}
function Mail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
