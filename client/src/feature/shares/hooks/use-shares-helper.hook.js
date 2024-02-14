import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { selectSocket } from 'store/reducers/socket/socket-slice';
import { selectFavoritesShares, selectShares, selectShowFavoritesShares, setData, setFavorites } from 'store/reducers/shares/shares-slice';
import { definePriceVector } from '../utils';
import { selectSearchQuery } from 'store/reducers/search/search-slice';

export const useSharesHelper = () => {
  const dispatch = useDispatch();
  const allData = useSelector(selectShares);
  const socket = useSelector(selectSocket);
  const query = useSelector(selectSearchQuery);
  const favorites = useSelector(selectFavoritesShares);
  const showFavorites = useSelector(selectShowFavoritesShares);

  let latestData = allData.length === 0 ? [] : allData[allData.length - 1];

  let priceVector = {};

  if (allData.length > 1) {
    priceVector = latestData.reduce(
      (acc, item) => ({
        ...acc,
        [item.ticker]: definePriceVector(allData[allData.findIndex((arr) => arr.length === latestData.length)], latestData, item.ticker),
      }),
      {},
    );
  } else {
    priceVector = latestData.reduce((acc, item) => ({ ...acc, [item.ticker]: 'same' }), {});
  }

  const dataForFiltering = showFavorites ? favorites : latestData;
  const operation = showFavorites ? 'remove' : 'add';

  const queryData =
    query.length !== 0 ? dataForFiltering.filter((item) => item.ticker.toLowerCase().includes(query.toLowerCase())) : dataForFiltering;

  const handleSetData = useCallback((response) => dispatch(setData(response)), [dispatch]);

  const handleSetFavorites = (tickerItem) => {
    dispatch(setFavorites({ tickerItem, operation }));
  };

  useEffect(() => {
    if (socket) {
      socket.emit('start');
      socket.on('ticker', handleSetData);
    }
  }, [socket, handleSetData]);

  return {
    queryData,
    priceVector,
    operation,
    favorites,
    handleSetFavorites,
  };
};
