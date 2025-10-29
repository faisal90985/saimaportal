import React from 'react';
import { SaimaConnectLogo } from './icons';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-3">
          <SaimaConnectLogo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary tracking-tight">
            Saima Connect
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
