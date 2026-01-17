import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import Layout from "./components/Layout/Layout"
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import AboutPage from './pages/AboutPage';
import BookmarkPage from './pages/BookmarkPage';

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      // { path: "login", element: <LoginPage /> },
      // { path: "signup", element: <SignupPage /> },
      { path: "bookmark", element: <BookmarkPage /> },
      { path: "explore", element: <ExplorePage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
];

const router = createBrowserRouter([
  ...publicRoutes,
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
