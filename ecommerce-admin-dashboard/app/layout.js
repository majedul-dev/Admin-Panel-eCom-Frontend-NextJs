'use client'; // Add this directive at the top
import './globals.css';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function RootLayout({ children }) {
  const isAdmin = true;

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex min-h-screen">
          <Sidebar isAdmin={isAdmin} />
          
          <main className={`flex-1 flex flex-col ${isAdmin ? 'ml-64' : ''}`}>
            {/* Header section remains here */}
            <Header />
            <div className='p-6'>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}