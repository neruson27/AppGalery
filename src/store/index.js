import {configureStore} from '@reduxjs/toolkit';
import itemSlice from './item';

export const store = configureStore({
  reducer: {
    item: itemSlice,
  },
});
