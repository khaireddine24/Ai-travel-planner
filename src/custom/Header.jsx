import React from 'react'
import { Button } from '../components/ui/button'
import { useUser, SignInButton, UserButton } from "@clerk/clerk-react"

const Header = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="p-1 shadow-sm flex justify-between items-center px-5">
      <img src="/svg/planning-service.svg" width={100} height={80} alt="Planning Service Logo" />
      <div>
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <span>Welcome, {user.fullName}</span>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        )}
      </div>
    </div>
  )
}

export default Header