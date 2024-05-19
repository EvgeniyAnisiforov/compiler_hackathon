import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type Animation = {
    value: boolean
}

const initialState: Animation = {
    value: true
}

export const animationBackgroundSlice = createSlice({
    name: '@@animationBackground',
    initialState,
    reducers:{
        setAnimation: (state, action: PayloadAction<boolean>)=>{
            state.value = action.payload
        }
    }
})

export default animationBackgroundSlice.reducer
export const {setAnimation} = animationBackgroundSlice.actions