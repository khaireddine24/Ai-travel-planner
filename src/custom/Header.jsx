import React from 'react';
import { Button } from '@/components/ui/button';
import { useUser, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Home, PlaneTakeoff, MapPin, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Header = () => {
  const { isSignedIn } = useUser();
  const routerState = useRouterState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (path) => routerState.location.pathname === path;

  const NavLinks = () => (
    <>
      <Link 
        to="/" 
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
          isActive('/') 
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <Home size={20} />
        <span>Home</span>
      </Link>
      <Link 
        to="/CreateTrip" 
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
          isActive('/CreateTrip') 
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <PlaneTakeoff size={20} />
        <span>Create Trip</span>
      </Link>
      <Link 
        to="/MyTrips" 
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
          isActive('/MyTrips') 
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <MapPin size={20} />
        <span>My Trips</span>
      </Link>
    </>
  );

  return (
    <header className='bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 py-3 px-4 md:px-6'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <img 
            src='/svg/planning-service.svg' 
            width={80} 
            height={64} 
            alt='Planning Service Logo' 
            className='hover:scale-105 transition-transform'
          />
          <h1 className='hidden md:block text-xl font-bold text-gray-800 dark:text-white'>
            TravelPlan
          </h1>
        </div>

        <nav className='hidden md:flex items-center space-x-4'>
          {isSignedIn ? (
            <div className='flex items-center space-x-4'>
              <NavLinks />
              <ThemeToggle />
              <UserButton />
            </div>
          ) : (
            <>
              <ThemeToggle />
              <SignInButton mode="modal">
                <Button variant="outline" className='flex items-center space-x-2 dark:border-gray-700 dark:text-gray-300'>
                  <User size={18} />
                  <span>Sign In</span>
                </Button>
              </SignInButton>
            </>
          )}
        </nav>

        <div className='md:hidden flex items-center space-x-2'>
          <ThemeToggle />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className='md:hidden absolute left-0 right-0 bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800'>
          <nav className='flex flex-col p-4 space-y-2'>
            {isSignedIn ? (
              <>
                <NavLinks />
                <div className='pt-2 border-t dark:border-gray-700'>
                  <UserButton />
                </div>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button 
                  variant="outline" 
                  className='w-full flex items-center space-x-2 dark:border-gray-700 dark:text-gray-300'
                >
                  <User size={18} />
                  <span>Sign In</span>
                </Button>
              </SignInButton>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;