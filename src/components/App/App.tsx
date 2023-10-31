import { Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import ItemPage from './ItemPage';
import Error404Page from './Error404Page';
import CategoryItemsPage from './CategoryItemsPage/CategoryItemsPage';

interface IRouter {
  path: string;
  element: React.ReactNode | null;
}

const routes: IRouter[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/:category',
    element: <CategoryItemsPage />,
  },
  {
    path: '/:category/:model',
    element: <ItemPage />,
  },
  {
    path: '*',
    element: <Error404Page />,
  },
];

export default function App() {
  return (
    <Routes>
      {routes.map((element, index) => {
        return (
          <Route key={index} path={element.path} element={element.element} />
        );
      })}
    </Routes>
  );
}
