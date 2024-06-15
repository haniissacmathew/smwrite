import {  createBrowserRouter     } from 'react-router-dom';
import Home from '../Home/Home';
import App from '../App';
import NewProject from '../Project/new';
import DefaultLayout from '../Layout/DefaultLayout';
import Editor from '../Editor/Editor';
// import NotFound from './components/NotFound';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />, // Wrap root path with Layout
    children: [
      { path: '/', element: <Home /> },
      { path: '/new-project', element: <NewProject /> },
      { path: '/editor', element: <Editor /> },
      // Add more child routes here
    ],
  },
]);