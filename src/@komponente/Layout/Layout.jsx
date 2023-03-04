import React from 'react';
import Futer from './Futer';
import Heder from './Heder';

function Layout({ children }) {
  return (
    <div className="h-full">
      <Heder />
      <main className="w-full bg-orange-100 p-5 pb min-h-screen">
        {children}
      </main>
      <Futer />
    </div>
  );
}

export default Layout;
