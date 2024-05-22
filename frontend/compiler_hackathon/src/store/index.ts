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
import { postAuthApi } from "./query/POST/postAuthApi"
import { postRegApi } from "./query/POST/postRegApi"
import { postCodeApi } from "./query/POST/postCodeApi"
import { statusAuthSlice } from "./statusAuth-slice"

const rootReducer = combineReducers({
  setColor: colorSelectorSlice.reducer,
  animationBackground: animationBackgroundSlice.reducer,
  statusAuth: statusAuthSlice.reducer,
  [getCodeApi.reducerPath]: getCodeApi.reducer,
  [getTimeApi.reducerPath]: getTimeApi.reducer,
  [postAuthApi.reducerPath]: postAuthApi.reducer,
  [postRegApi.reducerPath]: postRegApi.reducer,
  [postCodeApi.reducerPath]: postCodeApi.reducer,
})

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    getCodeApi.reducerPath,
    getTimeApi.reducerPath,
    postAuthApi.reducerPath,
    postCodeApi.reducerPath,
    postRegApi.reducerPath,
    statusAuthSlice.reducerPath,
    'statusAuth'
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
      postAuthApi.middleware,
      postRegApi.middleware,
      postCodeApi.middleware
    ),
  devTools: true,
})

export const persistor = persistStore(store)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
