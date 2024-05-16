import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type Color = {
    value: string
}

const initialState: Color = {
    value: "#4e54c8"
}

export const colorSelectorSlice = createSlice({
    name: '@@colorSelector',
    initialState,
    reducers:{
        setColor: (state, action: PayloadAction<string>)=>{
            state.value = action.payload
        }
    }
})

export default colorSelectorSlice.reducer
export const {setColor} = colorSelectorSlice.actions