'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Container from './container';
import Button from './button';
import classNames from 'classnames';

import { Logo } from './icons/logo';
import { HamburgerIcon } from './icons/hamburger';

const Header = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  useEffect(() => {
    document
      .querySelector('html')
      ?.classList.toggle('overflow-hidden', hamburgerOpen);
  });

  useEffect(() => {
    const closeHamburger = () => setHamburgerOpen(false);

    window.addEventListener('orientationchange', closeHamburger);
    window.addEventListener('resize', closeHamburger);

    return () => {
      window.removeEventListener('orientationchange', closeHamburger);
      window.removeEventListener('resize', closeHamburger);
    };
  }, [setHamburgerOpen]);

  return (
    <header className="backdrop-blur-[12px] fixed top-0 left-0 w-full border-b border-transparent-white z-10">
      <Container className="flex h-navigation-height">
        <Link href={'/'} className="flex items-center text-md">
          <Logo className="w-[1.8rem] h-[1.8rem] mr-4" /> Linear
        </Link>

        <div
          className={classNames(
            'transition-[visibility] md:visible',
            hamburgerOpen ? 'visible' : 'invisible delay-500',
          )}
        >
          <nav
            className={classNames(
              'h-[calc(100vh_-_var(--navigation-height))] md:relative fixed md:top-0 md:h-auto md:bg-transparent md:w-auto top-navigation-height left-0 w-full bg-background overflow-auto md:visible md:opacity-100 transition-opacity duration-500',
              hamburgerOpen ? 'opacity-100' : 'opacity-0',
            )}
          >
            <ul
              className={classNames(
                'flex flex-col md:flex-row md:items-center h-full [&_li]:ml-6 [&_li]:border-b [&_li]:border-grey-dark md:[&_li]:border-none',
                '[&_a]:duration-300 [&_a]:translate-y-8 md:[&_a]:translate-y-0 [&_a]:transition-[color,transform] [&_a]:h-navigation-height [&_a]:w-full [&_a]:flex [&_a]:items-center [&_a]:text-md md:[&_a]:text-sm [&_a:hover]:text-grey [&_li]:ml-6',
                hamburgerOpen ? '[&_a]:translate-y-0' : '',
              )}
            >
              <li>
                <Link href="#">Features</Link>
              </li>
              <li>
                <Link href="#">Method</Link>
              </li>
              <li className="md:hidden lg:block">
                <Link href="#">Customers</Link>
              </li>
              <li className="md:hidden lg:block">
                <Link href="#">Changelog</Link>
              </li>
              <li className="md:hidden lg:block">
                <Link href="#">Integrations</Link>
              </li>
              <li>
                <Link href="#">Pricing</Link>
              </li>
              <li>
                <Link href="#">Company</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center h-full ml-auto">
          <Link className="mr-6 text-sm" href="#">
            Log In
          </Link>
          <Button href="#">Sign up</Button>
        </div>

        <button
          className="ml-6 md:hidden"
          onClick={() => setHamburgerOpen((open) => !open)}
        >
          <span className="sr-only">Toggle menu</span>
          <HamburgerIcon />
        </button>
      </Container>
    </header>
  );
};

export default Header;
