<<<<<<< HEAD
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
=======
import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { launchImageLibrary } from 'react-native-image-picker'

const Tempt = () => {

    const [photo, setPhoto] = useState(null)

    const handleImage = () => {
        const options = {
            noData: true
        }
        launchImageLibrary( options, response=>{
            console.log('response: ', response)
            if ( response.uri ) setPhoto(response)
        } )
    }

    return (
        <View style={styles.container}>

            {
                photo!=null &&
                <Image
                    style={{width: 100, height: 100}}
                    source={{uri: photo.uri}}
                />
            }



            <TouchableOpacity
                onPress={handleImage}
                style={{ backgroundColor: 'white', paddingHorizontal: 30, paddingVertical: 20 }}>
                <Text>Choose image</Text>
            </TouchableOpacity>
            
        </View>
>>>>>>> 88100b03a8970422ee9453b891dd370d3618a862
    )
}

export default Tempt

<<<<<<< HEAD
const styles = StyleSheet.create({})

=======
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center', justifyContent: 'center'
    }
})

/// Ta da tung o day
>>>>>>> 88100b03a8970422ee9453b891dd370d3618a862
