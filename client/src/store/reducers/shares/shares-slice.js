import { createSlice } from '@reduxjs/toolkit';

export const sharesSlice = createSlice({
  name: 'shares',
  initialState: {
    all: [],
    favorites: [],
    showFavorites: false,
  },
  reducers: {
    setData: (state, action) => {
      state.all.push(action.payload);
    },
    setFavorites: (state, action) => {
      if (action.payload.operation === 'add') {
        state.favorites.push(action.payload.tickerItem);
      } else {
        state.favorites = state.favorites.filter((item) => item.ticker !== action.payload.tickerItem.ticker);
      }
    },
    setShowFavorites: (state, action) => {
      state.showFavorites = action.payload;
    },
  },
});

export const { setData, setFavorites, setShowFavorites } = sharesSlice.actions;

export const selectShares = (state) => state.shares.all;
export const selectFavoritesShares = (state) => state.shares.favorites;
export const selectShowFavoritesShares = (state) => state.shares.showFavorites;
export default sharesSlice.reducer;
