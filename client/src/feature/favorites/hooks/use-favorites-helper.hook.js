import { useDispatch, useSelector } from 'react-redux';
import { selectFavoritesShares, selectShowFavoritesShares, setShowFavorites } from 'store/reducers/shares/shares-slice';

export const useFavoritesHelper = () => {
  const favorites = useSelector(selectFavoritesShares);
  const showFavorites = useSelector(selectShowFavoritesShares);
  const dispatch = useDispatch();

  const handleSetShowFavorites = () => {
    dispatch(setShowFavorites(!showFavorites));
  };

  const favoritesQuantity = favorites.length;

  return { favoritesQuantity, handleSetShowFavorites };
};
