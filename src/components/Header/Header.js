import { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import classNames from 'classnames/bind';

import logo from '@/assets/images/header-logo.png';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const headerNav = [
  {
    display: 'Home',
    path: '/',
  },
  {
    display: 'Movie',
    path: '/movie',
  },
  {
    display: 'TV Series',
    path: '/tv',
  },
];

function Header({ className }) {
  let location = useLocation();

  const headerRef = useRef(null);

  const activeIndex = headerNav.findIndex((e) => e.path === location.pathname);

  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };

    window.addEventListener('scroll', shrinkHeader);

    return () => window.removeEventListener('scroll', shrinkHeader);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cx('header', {
        shrink,
      })}
    >
      <div className={cx('header-wrapper', { [className]: className })}>
        <div className={cx('header__logo')}>
          <img src={logo} alt="header-logo" />
          <Link to="/">DBMovie</Link>
        </div>
        <nav>
          <ul className={cx('header-navigation')}>
            {headerNav.map((e, i) => {
              const active = i === activeIndex ? 'active' : '';

              return (
                <li
                  className={cx('header-navigation__item', {
                    active,
                  })}
                  key={i}
                >
                  <Link to={e.path}>{e.display}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
