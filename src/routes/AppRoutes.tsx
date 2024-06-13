import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from '../Home/Home';
// import NotFound from './components/NotFound';
const routes = createBrowserRouter([
 { path: '/', element: <Home /> },  // username password login
]);
const AppRoutes = () => {
  return (
    <RouterProvider router={routes} />
  );
}

export default AppRoutes;