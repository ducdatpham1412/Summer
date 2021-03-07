import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = [
    
]

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        name: {}
    },
    reducers: {
        increment: state=>{
            state.value++
        },
        decrement: state=>{
            state.value--
        },
        setName: (state, action)=>{
            state.name = action.payload
        }
    },
})

export const getDataFromAPI = ()=>async(dispatch)=>{
    const res = await axios.get('http://www.json-generator.com/api/json/get/bUkdRpDoRK?indent=2')
    dispatch(setName(res.data))
}

const fetchUserById = userId => {
    return async (dispatch, getSatate)=>{
        try {
            const user = await userAPI.user()
        }
        catch(err) {
            console.log(err)
        }
    }
}

export const { decrement, increment, setName } = counterSlice.actions

export default counterSlice = counterSlice.reducers