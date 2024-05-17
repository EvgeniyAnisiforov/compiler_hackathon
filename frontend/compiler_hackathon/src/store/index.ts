import {configureStore} from "@reduxjs/toolkit"
import {colorSelectorSlice} from "./colorSelector-slice"
import { getCodeApi } from './getCodeApi'
import { getTimeApi } from "./getTimeApi"
import { getColorApi } from "./getColorApi"
import { postAuthApi } from "./postAuthApi"
import { postRegApi } from "./postRegApi"

export const store = configureStore({
    reducer:{
        setColor: colorSelectorSlice.reducer,
        [getCodeApi.reducerPath]: getCodeApi.reducer,
        [getTimeApi.reducerPath]: getTimeApi.reducer,
        [getColorApi.reducerPath]: getColorApi.reducer,
        [postAuthApi.reducerPath]: postAuthApi.reducer,
        [postRegApi.reducerPath]: postRegApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getCodeApi.middleware, getTimeApi.middleware, getColorApi.middleware, postAuthApi.middleware,postRegApi.middleware),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch