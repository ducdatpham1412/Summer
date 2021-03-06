import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../counter/counterSlice'

const SummerStore = configureStore({
    reducer: {
        counterSlice
    }
})
export default SummerStore