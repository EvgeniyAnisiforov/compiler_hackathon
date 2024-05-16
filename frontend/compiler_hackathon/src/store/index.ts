import {configureStore} from "@reduxjs/toolkit"
import {colorSelectorSlice} from "./colorSelector-slice"

export const store = configureStore({
    reducer:{
        setColor: colorSelectorSlice.reducer,
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch