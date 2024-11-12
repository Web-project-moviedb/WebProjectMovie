import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages import
import ErrorPage from './pages/ErrorPage.js';
import Home from './pages/Home.js';
import Reviews from './pages/Reviews.js';
import Groups from './pages/Groups.js'
import ShowTimes from './pages/ShowTimes.js';
import Favorites from './pages/Favourites.js';
import Movie from './pages/Movie.js';
import Login from './pages/LoginPage.js';

// Front end routing 
const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />
  },

  //Navigatino bar pages
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/reviews",
    element: <Reviews />,
  },
  {
    path: "/groups",
    element: <Groups />,
  },
  {
    path: "/showtimes",
    element: <ShowTimes />,
  },

  // Other pages
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/movie",
    element: <Movie />,
  },
  {
    path: "/movie",
    element: <Movie />,
  },
  {
    path: "/login",
    element: <Login />
  }
  /* Example for later for a route that would need a token check before opening the page 
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: ,
      }
    ]
  } */

])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
