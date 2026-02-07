// src/App.tsx
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import AboutPage from './pages/AboutPage'
import BookmarkPage from './pages/BookmarkPage'
import ProfilePage from './pages/ProfilePage'
import HistoryPage from './pages/HistoryPage'
import { BookmarkProvider } from './context/BookmarkContext' // [추가]
import APIDetailPage from './pages/APIDetailPage'
import { AuthProvider } from './context/AuthProvider'

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'bookmark', element: <BookmarkPage /> },
      { path: 'explore', element: <ExplorePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'apis/:id', element: <APIDetailPage /> },
    ],
  },
]

const router = createBrowserRouter([...publicRoutes])

function App() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <RouterProvider router={router} />
      </BookmarkProvider>
    </AuthProvider>
  )
}

export default App
