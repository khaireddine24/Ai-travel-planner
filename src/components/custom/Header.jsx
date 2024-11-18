import React from 'react';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <div className='p-1 shadow-sm flex justify-between items-center px-5'>
      <img src='/planning-service.svg' width={100} height={80}/>
      <div>
        <Button>
            SignIn
        </Button>
      </div>
    </div>
  )
}

export default Header