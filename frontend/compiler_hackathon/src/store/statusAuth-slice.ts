import {createSlice, PayloadAction} from "@reduxjs/toolkit"


type TypeInfoUser = {
    name: string,
    surname: string,
    userId: number,
    status: boolean
}
type StatusAuth = {
    value: TypeInfoUser
}

const initialState: StatusAuth = {
    value: {
        name: "",
        surname: "",
        userId: 0,
        status: false
    }
}

export const statusAuthSlice = createSlice({
    name: '@@statusAuth',
    initialState,
    reducers:{
        setStatusAuth: (state, action: PayloadAction<TypeInfoUser>)=>{
            state.value = action.payload
        }
    }
})

export default statusAuthSlice.reducer
export const {setStatusAuth} = statusAuthSlice.actions