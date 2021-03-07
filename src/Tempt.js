import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import One from './One'
import SummerStore from './app/store'

const Tempt = () => {
    return (
        <Provider store={SummerStore}>
            <One />
        </Provider>
    )
}

export default Tempt

const styles = StyleSheet.create({})

