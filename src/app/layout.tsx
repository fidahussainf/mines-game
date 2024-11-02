'use client';
import React from 'react';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from './store/index';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang='en'>
        <body className='flex flex-col'>
          <header className='p-4 bg-gray-800 text-white text-center'>
            <h1>Mines Game</h1>
          </header>
          <main>{children}</main>
          <footer className='p-4 bg-gray-800 text-white text-center'>
            <p>© Mines Game</p>
          </footer>
        </body>
      </html>
    </Provider>
  );
}
