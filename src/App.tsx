import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import AboutPage from './pages/AboutPage'
import BookmarkPage from './pages/BookmarkPage'
// ProfilePage import 추가 (모달은 지우세요)
import ProfilePage from './pages/ProfilePage'

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
      // 프로필 라우트 추가
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
]

const router = createBrowserRouter([...publicRoutes])

function App() {
  return <RouterProvider router={router} />
}

export default App
