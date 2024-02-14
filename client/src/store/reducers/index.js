import { combineReducers } from '@reduxjs/toolkit';
import sharesReducer from './shares/shares-slice.js';
import socketReducer from './socket/socket-slice.js';
import searchReducer from './search/search-slice.js';

export const rootReducer = combineReducers({
  shares: sharesReducer,
  socket: socketReducer,
  search: searchReducer,
});
