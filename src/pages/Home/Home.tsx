import { FC, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from './../../redux/store';

import { setCategoryId, setCurrentPage } from '../../redux/filter/filterSlice';
import { fetchPizzas } from './../../redux/pizza/asyncActions';

import { selectFilter } from '../../redux/filter/selectors';
import { selectPizzaData } from '../../redux/pizza/selectors';

import { pageLimit } from './../../constants/constants';

import { Categories, Sort, Skeleton, PizzaBlocks, Pagination } from '../../components';

const Home: FC = () => {
  const dispatch = useAppDispatch();

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = useCallback(
    (index: number) => {
      dispatch(setCategoryId(index));
    },
    [dispatch],
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? String(categoryId) : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue;

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
  };

  useEffect(() => {
    getPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, currentPage, searchValue, sort.sortProperty]);

  const pizzas = items.map((item) => <PizzaBlocks key={item.id} {...item} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  // mockAPI does not return the number of pages

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>

      <h2 className="content__title">All pizzas</h2>

      {status === 'error' ? (
        <div className="content__error-info">
          <h2>An error has occurred 😕</h2>
          <p>Unfortunately we couldn't get the pizzas. Please try again later.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
