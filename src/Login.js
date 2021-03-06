import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text, View, TextInput, TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const saveToStorage = async () => {
        try {
            await AsyncStorage.setItem('username', username)
            await AsyncStorage.setItem('password', password)
        }
        catch (err) {
            console.log(err)
        }
    }
    const getData = async () => {
        try {
            const username = await AsyncStorage.getItem('username')
            const password = await AsyncStorage.getItem('password')
            setUsername(username)
            setPassword(password)
        }
        catch (err) {
            console.log(err)
        }
    }
    const clearStorage = async()=>{
        // await AsyncStorage.clear()
        AsyncStorage.getAllKeys( result=>{
            console.log(result)
        } )
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Login</Text>

            <TextInput
                placeholder='Username'
                style={{
                    width: '90%',
                    paddingVertical: 30, paddingHorizontal: 20,
                    fontSize: 30
                }}
                value={username}
                onChangeText={value => setUsername(value)}
            />
            <TextInput
                placeholder='Password'
                style={{
                    width: '90%',
                    paddingVertical: 30, paddingHorizontal: 20,
                    fontSize: 30
                }}
                value={password}
                onChangeText={value => setPassword(value)}
            />

            <TouchableOpacity
                style={{
                    paddingHorizontal: 20, paddingVertical: 10,
                    backgroundColor: 'orange'
                }}
            >
                <Text style={{fontSize: 30}}>Login</Text>
            </TouchableOpacity>
       
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center', justifyContent: 'center'
    }
})
