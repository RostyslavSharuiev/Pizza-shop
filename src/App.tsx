import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import MainLayout from './layouts/MainLayout';

import { Home } from './pages';

import './scss/app.scss';

/* Lazy loading using Loadable need for SSR
 *If need only CSR, use React.lazy
 */
const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart/Cart'),
  loading: () => <div>Cart is loading...</div>,
});
const FullPizza = Loadable({
  loader: () => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza/FullPizza'),
  loading: () => <div>Loading...</div>,
});
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Cart is loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
