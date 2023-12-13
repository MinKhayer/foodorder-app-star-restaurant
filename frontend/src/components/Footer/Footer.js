import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "react-bootstrap-icons";
import styles from "./Footer.module.css";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const listenToScroll = () => {
    let heightToHidden = 250;
    const windowScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    windowScroll > heightToHidden ? setIsVisible(true) : setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);

    return () => {
      window.removeEventListener("scroll", listenToScroll);
    };
  }, []);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerRow}>
          <div className={`${styles.footerColumn} ${styles.textCenter}`}>
            <h5>Location</h5>
            <p>5505</p>
            <p>ADEPT Care complex</p>
            <p>Bangladesh</p>
          </div>
          <div className={styles.footerColumn}>
            <h5>Working Hours</h5>
            <p>Mon-Fri: 9:00AM - 10:00PM</p>
            <p>Saturday: 10:00AM - 8:30PM</p>
            <p>Sunday: 12:00PM - 5:00PM</p>
          </div>
          <div className={styles.footerColumn}>
            <h5>Order Now</h5>
            <p>Quaerat neque purus ipsum</p>
            <p>
              <Link to="tel:9998887777" className={styles.calling}>
                01776858574
              </Link>
            </p>
          </div>
          <div className={styles.footerColumn}>
            <h5>Follow Us</h5>
            <p>Quaerat neque purus ipsum</p>
            <ul className={`${styles.listUnstyled} ${styles.textCenter} mt-2`}>
              <li>
                <Link to="/">
                  <Facebook className={styles.iconFacebook} />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Twitter className={styles.iconTwitter} />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Instagram className={styles.iconInstagram} />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Youtube className={styles.iconYoutube} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.copyRight}>
          <ul className={`${styles.listUnstyled} ${styles.textCenter} mb-0`}>
            <li>
              <Link to="/">
                © 2023 <span>Star Restaurant</span>. All Rights Reserved
              </Link>
            </li>
            <li>
              <Link to="/">About Us</Link>
            </li>
            <li>
              <Link to="/">Terms Of Use</Link>
            </li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </footer>
      {/* Scroll To Top */}
      {isVisible && (
        <div className={styles.scrollTop} onClick={scrollTop}>
          <i className={styles.iconArrowUp}></i>
        </div>
      )}
    </>
  );
}
