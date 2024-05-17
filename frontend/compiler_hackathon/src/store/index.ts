import { configureStore } from "@reduxjs/toolkit"
import { colorSelectorSlice } from "./colorSelector-slice"
import { getCodeApi } from "./query/GET/getCodeApi"
import { getTimeApi } from "./query/GET/getTimeApi"
import { getColorApi } from "./query/GET/getColorApi"
import { postAuthApi } from "./query/POST/postAuthApi"
import { postRegApi } from "./query/POST/postRegApi"
import { postCodeApi } from "./query/POST/postCodeApi"
import { postColorApi } from "./query/POST/postColorApi"

export const store = configureStore({
  reducer: {
    setColor: colorSelectorSlice.reducer,
    [getCodeApi.reducerPath]: getCodeApi.reducer,
    [getTimeApi.reducerPath]: getTimeApi.reducer,
    [getColorApi.reducerPath]: getColorApi.reducer,
    [postAuthApi.reducerPath]: postAuthApi.reducer,
    [postRegApi.reducerPath]: postRegApi.reducer,
    [postCodeApi.reducerPath]: postCodeApi.reducer,
    [postColorApi.reducerPath]:postColorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      getCodeApi.middleware,
      getTimeApi.middleware,
      getColorApi.middleware,
      postAuthApi.middleware,
      postRegApi.middleware,
      postCodeApi.middleware,
      postColorApi.middleware,
    ),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
