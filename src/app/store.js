import { configureStore } from "@reduxjs/toolkit";
import {throttle} from 'lodash';

import appReducer from "./appSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state2');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('loading error', err)
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state2', serializedState);
  } catch (err) {
    console.error('saving error', err)
  }
};

const store = configureStore({
  reducer: appReducer,
  preloadedState: loadState()
});

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

export default store
