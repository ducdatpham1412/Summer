import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    number: {
        value: 0
    }
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increase: (state, action) => {
            state.number.value += action.payload
        }
    }
})

export const { increase } = counterSlice.actions
export default counterSlice.reducer