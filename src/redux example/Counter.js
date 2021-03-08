import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {increase} from './counterSlice'

const Counter = () => {

    const value = useSelector(state=>state.counter.number.value)
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <Button
                title='Increase'
                onPress={()=>dispatch(increase(3))}
            />
            <Text>{value}</Text>
        </View>
    )
}

export default Counter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center', justifyContent: 'space-around'
    }
})
