import {  createBrowserRouter     } from 'react-router-dom';
import Home from '../Home/Home';
import NewProject from '../Project/new';
import DefaultLayout from '../Layout/DefaultLayout';
import Editor from '../Editor/Editor';
import About from '../Help/about';
// import NotFound from './components/NotFound';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />, // Wrap root path with Layout
    children: [
      { path: '/', element: <Home /> },
      { path: '/new-project', element: <NewProject /> },
      { path: '/editor', element: <Editor /> },
      { path: '/about', element: <About /> },
      // Add more child routes here
    ],
  },
]);