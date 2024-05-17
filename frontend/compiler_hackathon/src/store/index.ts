import {configureStore} from "@reduxjs/toolkit"
import {colorSelectorSlice} from "./colorSelector-slice"
import { getCodeApi } from './getCodeApi'

export const store = configureStore({
    reducer:{
        setColor: colorSelectorSlice.reducer,
        [getCodeApi.reducerPath]: getCodeApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getCodeApi.middleware),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch