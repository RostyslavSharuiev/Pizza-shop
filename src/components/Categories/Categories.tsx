import { FC, memo } from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const categories = ['All', 'Meat', 'Seafood', 'Grill', 'Spicy', 'Cheese'];

const Categories: FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            className={value === index ? 'active' : ''}
            onClick={() => onChangeCategory(index)}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
