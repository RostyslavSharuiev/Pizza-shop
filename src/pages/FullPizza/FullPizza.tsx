import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './FullPizza.module.scss';

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{ imageUrl: string; title: string; price: number }>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://63cab2d1d0ab64be2b58896d.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Error when getting pizza 😢');
        navigate('/');
      }
    }

    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div className="container">
      <div className={styles.root}>
        <img src={pizza.imageUrl} alt="Pizza" />
        <div>
          <h1>{pizza.title}</h1>
          <span>{pizza.price} &#8372;</span>
        </div>
      </div>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Go back</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
