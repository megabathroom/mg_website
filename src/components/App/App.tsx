import { Routes, Route } from 'react-router-dom';

import HomePage from '../../pages';
import Error404Page from '../../pages/404';
import BasketPage from '../../pages/basket';
import CategoryPage from '../../pages/products/[brand]/[category]';
import ModelPage from '../../pages/products/[brand]/[category]/[model]';
import Brands from '../Brands/Brands';
import Brand from '../Brand/Brand';
import SendOrderPage from '../../pages/basket/send-order';

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
    path: '/basket',
    element: <BasketPage />,
  },
  {
    path: '/basket/send-order',
    element: <SendOrderPage />,
  },
  {
    path: '/products',
    element: <Brands />,
  },
  {
    path: '/products/:brand',
    element: <Brand />,
  },
  {
    path: '/products/:brand/:category',
    element: <CategoryPage />,
  },
  {
    path: '/products/:brand/:category/:model',
    element: <ModelPage />,
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
