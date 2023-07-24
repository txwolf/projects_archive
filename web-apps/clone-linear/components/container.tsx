import React from 'react';

const Container = ({ children, className }: { children: React.ReactNode, className?: string; }) => {
  return (
    <div className={`max-w-[120rem] mx-auto ${className} px-8`}>{children}</div>
  );
};

export default Container;