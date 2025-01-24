'use client';

import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          ModelBooking
        </Link>
        <div className={styles.authLinks}>
          <Link href="/model/register" className={styles.link}>
            Model Register
          </Link>
          <Link href="/model/signin" className={styles.link}>
            Model Signin
          </Link>
        </div>
      </nav>
    </header>
  );
}
