'use client';

import React, { CSSProperties, useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

interface Line {
  id: string;
  direction: 'to bottom' | "to right";
  size: number;
  duration: number;
}

const HeroImage = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [lines, setLines] = useState<Line[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const removeLine = (id: string) => {
    setLines(lines.filter(line => line.id !== id));
  };

  useEffect(() => {
    if (!inView) return;

    const renderLine = (timeout: number) => {
      timeoutRef.current = setTimeout(() => {
        setLines(lines => [...lines, { direction: Math.random() > 0.5 ? "to bottom" : "to right", duration: randomNumber(1300, 3500), size: randomNumber(10, 30), id: Math.random().toString(36).substring(2, 15) }]);
        renderLine(randomNumber(800, 2500));
      }, timeout);
    };

    renderLine(randomNumber(800, 1300));

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inView, setLines]);


  return (
    <div className={classNames('mt-[12.8rem] [perspective:2000px]')} ref={ref} >
      <div className={classNames('relative bg-hero-gradient bg-white bg-opacity-[0.01] rounded-lg border-transparent-white',
        inView ? 'animate-image-rotate' : '[transform:rotateX(25deg)]',
        'before:bg-hero-glow before:w-full before:h-full before:top-0 before:left-0 before:absolute before:[filter:blur(120px)] before:opacity-0',
        inView && 'before:animate-image-glow'
      )}>
        <div className='absolute top-0 left-0 z-20 w-full h-full'>
          {lines.map((line) => (
            <span
              onAnimationEnd={() => removeLine(line.id)}
              className={classNames('bg-glow-lines block absolute top-0 right-0 w-[1px]',
                line.direction === "to right" && `w-[calc(var(--size)*1rem)] h-[1px] left-0 animate-glow-line-horizontal`,
                line.direction === "to bottom" && `h-[calc(var(--size)*1rem)] w-[1px] right-0 animate-glow-line-vertical`)}
              style={{ '--direction': line.direction, "--size": line.size, "--animation-duration": `${line.duration}ms` } as CSSProperties}></span>
          ))}
        </div>

        <svg
          className={classNames('absolute left-0 top-0 h-full w-full [&_path]:stroke-white [&_path]:[stroke-opacity:0.2] [&_path]:[stroke-dasharray:1] [&_path]:[stroke-dashoffset:1]',
            inView && '[&_path]:animate-sketch-lines'
          )}
          width="100%"
          viewBox="0 0 1499 778"
          fill="none"
        >
          <path pathLength="1" d="M1500 72L220 72"></path>
          <path pathLength="1" d="M1500 128L220 128"></path>
          <path pathLength="1" d="M1500 189L220 189"></path>
          <path pathLength="1" d="M220 777L220 1"></path>
          <path pathLength="1" d="M538 777L538 128"></path>
        </svg>

        <img className={classNames('relative transition-opacity delay-[600ms]',
          inView ? 'opacity-100' : 'opacity-0'
        )} src="/img/hero.webp" alt="Hero image" />
      </div>
    </div>
  );
};

export default HeroImage;