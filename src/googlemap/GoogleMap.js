import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import FittingTheScreen from './FittingTheScreen'


const MainScreen = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={()=>navigation.navigate('fittingTheScreen')}
            >
                <Text>Fitting The Screen</Text>
            </TouchableOpacity>
        </View>
    )
}


const Stack = createStackNavigator()

const GoogleMap = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name='mainScreen' component={MainScreen} />
                <Stack.Screen name='updateLocation' component={UpdateLocation} />
                <Stack.Screen name='moving' component={Moving} />
                <Stack.Screen name='fittingTheScreen' component={FittingTheScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default GoogleMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'orange',
        borderRadius: 20,
        marginVertical: 20
    }
})
