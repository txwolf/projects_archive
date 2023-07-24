import React from 'react';
import Button, { Highlight } from '../button';
import Hero, { HeroSubTitle, HeroTitle } from '../hero';
import HeroImage from '../hero-image';
import { ChevronIcon } from '../icons/chevron';

const HomepageHero = () => {
  return (
    <Hero>
      <Button href='/' variant='secondary' size='small' className='translate-y-[-1rem] animate-fade-in opacity-0'>
        Linear 2022 Release - Built for scale <Highlight>→</Highlight>
      </Button>
      <HeroTitle className='animate-fade-in [--animation-delay:200ms] opacity-0 translate-y-[-1rem]'>
        Linear is a better way
        <br className='hidden md:inline-block' /> to build products
      </HeroTitle>
      <HeroSubTitle className='animate-fade-in [--animation-delay:400ms] opacity-0 translate-y-[-1rem]'>
        Meet the new standard for modern software development.
        <br className='hidden md:block' />Streamline issues, sprints, and product roadmaps.
      </HeroSubTitle>
      <Button className='animate-fade-in [--animation-delay:600ms] opacity-0 translate-y-[-1rem]' href='/' size='large'>
        Get Started <Highlight><ChevronIcon /></Highlight>
      </Button>
      <HeroImage />
    </Hero>
  );
};

export default HomepageHero;