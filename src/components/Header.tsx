'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.jpeg"
            alt="ModelBooking Logo"
            width={48}
            height={48}
            className={styles.logoImage}
          />
          <span>EmployModels</span>
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
