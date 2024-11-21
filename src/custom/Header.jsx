import React from 'react'
import { Button } from '../components/ui/button'
import { useUser, SignInButton, UserButton } from '@clerk/clerk-react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Home, PlaneTakeoff, MapPin, User, Menu, X } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const { isSignedIn } = useUser();
  const routerState = useRouterState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (path) => routerState.location.pathname === path;

  const NavLinks = () => (
    <>
      <Link 
        to='/' 
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
          isActive('/') 
            ? 'bg-blue-100 text-blue-600' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Home size={20} />
        <span>Home</span>
      </Link>
      <Link 
        to='/CreateTrip' 
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
          isActive('/CreateTrip') 
            ? 'bg-blue-100 text-blue-600' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <PlaneTakeoff size={20} />
        <span>Create Trip</span>
      </Link>
      <Link 
        to='/MyTrips' 
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
          isActive('/MyTrips') 
            ? 'bg-blue-100 text-blue-600' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <MapPin size={20} />
        <span>My Trips</span>
      </Link>
    </>
  );

  return (
    <header className='bg-white shadow-md py-3 px-4 md:px-6'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <img 
            src='/svg/planning-service.svg' 
            width={80} 
            height={64} 
            alt='Planning Service Logo' 
            className='hover:scale-105 transition-transform'
          />
          <h1 className='hidden md:block text-xl font-bold text-gray-800'>TravelPlan</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-4'>
          {isSignedIn ? (
            <div className='flex items-center space-x-4'>
              <NavLinks />
              <UserButton 
                afterSignOutUrl="/" 
              />
            </div>
          ) : (
            <SignInButton mode="modal">
              <Button variant="outline" className='flex items-center space-x-2'>
                <User size={18} />
                <span>Sign In</span>
              </Button>
            </SignInButton>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden'>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='text-gray-600 hover:text-gray-800'
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden absolute left-0 right-0 bg-white shadow-lg'>
          <nav className='flex flex-col p-4 space-y-2'>
            {isSignedIn ? (
              <>
                <NavLinks />
                <div className='pt-2 border-t'>
                  <UserButton 
                    afterSignOutUrl="/" 
                    userProfileMode="navigation"
                    userProfileUrl="/profile"
                  />
                </div>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="outline" className='w-full flex items-center space-x-2'>
                  <User size={18} />
                  <span>Sign In</span>
                </Button>
              </SignInButton>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header