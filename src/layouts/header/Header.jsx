import React, { useEffect } from 'react';
import styles from './Header.module.scss';

const Header = () => {
  const scrollToCalculator = () => {
    const calculatorElement = document.getElementById('calculator');
    const y = calculatorElement.getBoundingClientRect().top + window.pageYOffset;
    window.scroll({
      top: y,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const headerElement = document.getElementById('header');
    const onScroll = () => {
      if (window.pageYOffset > headerElement.offsetHeight) {
        headerElement.style.opacity = '0';
      } else {
        headerElement.style.opacity = '1';
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header id="header" className={styles.header}>
      <h1>Kalkulator podatku akcyzowego</h1>
      <h3>Oblicz podatek akcyzowy od zakupu samochodu</h3>
      <div className={styles.scrollIcon} onClick={scrollToCalculator}>
        <i className="fas fa-arrow-down fa-2x"></i>
      </div>
    </header>
  );
};

export default Header;
