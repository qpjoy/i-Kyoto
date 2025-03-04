import { combineSlices, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from "redux-persist";

import accountSlice from "./features/Account/accountSlice";
import tictokSlice from "./features/Tictok/tictokSlice";
import helpSlice from "./features/Help/helpSlice";
import messageSlice from "./features/Messages/messageSlice";

const persistAccountConfig = {
  key: "account",
  version: 1,
  storage
};

const rootReducer = combineSlices(accountSlice, tictokSlice, helpSlice, messageSlice);

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const persistedReducer = persistReducer(persistAccountConfig, rootReducer);

export default () => {
  // let store = configureStore(persistedReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
        // serializableCheck: {
        //   ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
        // },
      })
  });
  let persistor = persistStore(store);
  return { store, persistor };
};
