import React from 'react';
import classNames from 'classnames';

interface HeroProps {
  children: React.ReactNode;
  className?: string;
}

interface HeroElementProps {
  children: React.ReactNode;
  className?: string;
}

export const HeroTitle = ({ children, className }: HeroProps) => {
  return <h1 className={classNames('my-6 text-6xl md:text-8xl text-gradient', className)}>{children}</h1>;
};

export const HeroSubTitle = ({ children, className }: HeroProps) => {
  return <p className={classNames('mb-12 text-lg md:text-xl text-primary-text', className)}>{children}</p>;
};

const hero = ({ children }: HeroProps) => {
  return (
    <div className='text-center'>
      {children}
    </div>
  );
};

export default hero;