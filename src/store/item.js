import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  homeItems: [],
  profileItems: [],
  homeItemPosition: 0,
  profileItemPosition: 0,
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.homeItems = [...state.homeItems, ...action.payload];
    },
    setProfileItems: (state, action) => {
      state.profileItems = [...action.payload];
    },
    setPosition: (state, {payload}) => {
      if (
        payload.many >= 0 &&
        payload.many < state[`${payload.positionType}Items`].length
      ) {
        state[`${payload.positionType}ItemPosition`] = payload.many;
      }
    },
  },
});

export const {setItems, setPosition, setProfileItems} = itemSlice.actions;

export default itemSlice.reducer;
