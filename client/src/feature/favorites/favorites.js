import React from 'react';
import './favorites.css';
import { ReactComponent as FavoritesIcon } from 'assets/icons/favorites.svg';
import { useFavoritesHelper } from './hooks/use-favorites-helper.hook.js';
import Button from 'components/button/button';

const Favorites = () => {
  const { favoritesQuantity, handleSetShowFavorites } = useFavoritesHelper();
  return (
    <div className="favorites">
      <Button fn={handleSetShowFavorites} img={<FavoritesIcon />} />
      <span>{favoritesQuantity}</span>
    </div>
  );
};

export default Favorites;
