import React, { Component } from 'react'
import { Text, View, StyleSheet, Animated } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

export class AnimatedView extends Component {

    constructor() {
        super()
        this.translateX = new Animated.Value(0)

        this.onGestureEvent = Animated.event([
            {
                nativeEvent: {
                    translationX: this.translateX
                }
            }
        ], {useNativeDriver: false})
    }

    render() {
        return (
            <View style={styles.container}>
                <PanGestureHandler onGestureEvent={this.onGestureEvent}>
                    <Animated.View
                        style={styles.box}
                    />
                </PanGestureHandler>
            </View>
        )
    }
}

export default AnimatedView


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        justifyContent: 'center'
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
    }
})

