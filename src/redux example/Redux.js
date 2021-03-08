import React from 'react'
import { Provider } from 'react-redux'
import Counter from './Counter'
import counterStore from './store'

const Redux = () => {
    return (
        <Provider store={counterStore}>
            <Counter />
        </Provider>
    )
}

export default Redux
