import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '@/custom/Header'

export const Route = createRootRoute({
  component: () => (
    <div>
      <Header />
      <Outlet />
    </div>
  )
})