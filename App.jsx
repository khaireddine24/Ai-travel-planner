import React from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { createRouter } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'

const router = createRouter({ routeTree })

function App() {
  return <RouterProvider router={router} />
}

export default App