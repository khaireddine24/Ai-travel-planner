import Hero from '@/components/custom/Hero'

import { createRouter } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen';
import { RouterProvider } from '@tanstack/react-router';

const router=createRouter({routeTree});

function App() {
  return (
  <>
    <Hero/>
    <RouterProvider router={router} />
  </>
)
}

export default App;
