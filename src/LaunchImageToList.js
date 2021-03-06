import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'


const Rec = (props)=>{
    return (
        <View style={styles.rec}>
            <Image
                style={{flex: 1, resizeMode: 'contain'}}
                source={{uri: props.uri}}
            />
        </View>
    )
}

const LaunchImageToList = () => {

    const [photo, setPhoto] = useState([])

    const handleClick = ()=>{
        launchImageLibrary( {}, response=>{
            console.log('response: ', response.uri)
            if (response.uri) {
                setPhoto(photo.concat({
                    id: photo.length-1,
                    uri: response.uri
                }))
            }
        } )
    }

    return (
        <View style={styles.container}>

            <View style={{...styles.top}}>
                <TouchableOpacity
                    onPress={handleClick}
                >
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>Push</Text>
                </TouchableOpacity>
            </View>

            <View style={{...styles.bottom}}>
                <FlatList
                    data={photo}
                    keyExtractor={ item=>item.id.toString() }
                    renderItem={ ({item}) => <Rec uri={item.uri} /> }
                />
            </View>

        </View>
    )
}
export default LaunchImageToList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange'
    },

    top: {
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'lightblue'
    },
    bottom: {
        flex: 10,
        alignItems: 'center', justifyContent: 'center'
    },
    rec: {
        width: 300, height: 200,
        backgroundColor: 'lightblue',
        marginVertical: 20
    }
})
