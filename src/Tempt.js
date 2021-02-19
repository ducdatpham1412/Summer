import React, {useState, useReducer, useRef} from 'react'
import {
    StyleSheet,
    View, Text, TouchableOpacity, TextInput, Button
} from 'react-native'

const Tempt = () => {

    const ref_password = useRef(null)
    const ref_login = useRef(null)

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Username'
                // autoFocus={true}
                returnKeyType='next'
                onSubmitEditing={ ()=>ref_password.current.focus() }
            />
            <TextInput
                placeholder='Password'
                returnKeyType='next'
                onSubmitEditing={ ()=>ref_login.current.focus() }
                ref={ref_password}
            />
            <TouchableOpacity
                ref={ref_login}
                onAccessibilityAction={ ()=>alert('Hello world') }
                onAccessibilityTap={ ()=>alert('Hello world') }
                onMagicTap={ ()=>alert('Hello world') }
                onPressIn={ ()=>alert('Hello world') }
                onFocus={ ()=>alert('Hello world') }
                onSubmitEditing={ ()=>alert('Hello world') }
                onAccessibilityEscape={ ()=>alert('Hello world') }
                onk
            >
                <Text>Let go</Text>
            </TouchableOpacity>
            
        </View>
    )
}
export default Tempt

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'lightblue'
    }
})