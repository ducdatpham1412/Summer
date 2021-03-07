import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, getDataFromAPI } from './counter/counterSlice'

const One = () => {

    const data = useSelector(state => state.counter)
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <Button
                    title='Decrease'
                    onPress={()=>dispatch(decrement())}
                />
                <Text style={{fontSize: 30}}>{data.value}</Text>
                <Button
                    title='Increase'
                    onPress={()=>dispatch(increment())}
                />
            </View>
            <Button
                title='getAPI'
                onPress={() => dispatch(getDataFromAPI())}
            />
            <Text>
                {JSON.stringify(data.name)}
            </Text>
        </View>
    )
}
export default One

/// skfksfslfklkljsfklfs

