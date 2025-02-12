'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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
        
        <div className={styles.mainLinks}>
          {/* Booking dropdown */}
          <div 
            className={styles.dropdownContainer}
            onMouseEnter={() => setIsBookingOpen(true)}
            onMouseLeave={() => setIsBookingOpen(false)}
          >
            <button className={styles.dropdownTrigger}>
              Book Services
              <svg 
                className={`${styles.dropdownArrow} ${isBookingOpen ? styles.dropdownArrowOpen : ''}`}
                width="10" 
                height="6" 
                viewBox="0 0 10 6" 
                fill="none"
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {isBookingOpen && (
              <div className={styles.dropdownMenu}>
                <Link href="/booking" className={styles.dropdownLink}>
                  Book a Model
                </Link>
                <Link href="/villas" className={styles.dropdownLink}>
                  Book a Villa
                </Link>
                <Link href="/boats" className={styles.dropdownLink}>
                  Book a Boat
                </Link>
              </div>
            )}
          </div>
          
          {/* Other links */}
          <div className={styles.authLinks}>
            <Link href="/model/register" className={styles.link}>
              Model Register
            </Link>
            <Link href="/model/signin" className={styles.link}>
              Model Signin
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
