import { configureStore, combineReducers } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { colorSelectorSlice } from "./colorSelector-slice"
import { animationBackgroundSlice } from "./animationBackground-slice"
import { getCodeApi } from "./query/GET/getCodeApi"
import { getTimeApi } from "./query/GET/getTimeApi"
import { getColorApi } from "./query/GET/getColorApi"
import { postAuthApi } from "./query/POST/postAuthApi"
import { postRegApi } from "./query/POST/postRegApi"
import { postCodeApi } from "./query/POST/postCodeApi"
import { postColorApi } from "./query/POST/postColorApi"


const rootReducer = combineReducers({
  setColor: colorSelectorSlice.reducer,
  animationBackground: animationBackgroundSlice.reducer,
  [getCodeApi.reducerPath]: getCodeApi.reducer,
  [getTimeApi.reducerPath]: getTimeApi.reducer,
  [getColorApi.reducerPath]: getColorApi.reducer,
  [postAuthApi.reducerPath]: postAuthApi.reducer,
  [postRegApi.reducerPath]: postRegApi.reducer,
  [postCodeApi.reducerPath]: postCodeApi.reducer,
  [postColorApi.reducerPath]: postColorApi.reducer,
})

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    getCodeApi.reducerPath,
    getColorApi.reducerPath,
    getTimeApi.reducerPath,
    postAuthApi.reducerPath,
    postCodeApi.reducerPath,
    postColorApi.reducerPath,
    postRegApi.reducerPath
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      getCodeApi.middleware,
      getTimeApi.middleware,
      getColorApi.middleware,
      postAuthApi.middleware,
      postRegApi.middleware,
      postCodeApi.middleware,
      postColorApi.middleware
    ),
  devTools: true,
})

export const persistor = persistStore(store)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
