import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import geolocation from 'react-native-geolocation-service'


const UpdateLocation = () => {

    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
        altitude: 14.228620446048385,
    })
    const [zoom, setZoom] = useState(5)

    const onRegionChange = value => {
        setRegion(value)
        console.log(region)
    }
    // const onUserLocationChange = (coordinate) => {
    //     console.log('coordinate: \n', coordinate.nativeEvent.coordinate)
    // }

    const decreaseScale = () => {
        setZoom(zoom / 1.2);
    }
    const increaseScale = () => {
        setZoom(zoom * 1.2);
    }


    useEffect(() => {
        geolocation.getCurrentPosition(
            pos=>{
                setRegion({
                    ...region,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                })
            },
            err=>{
                console.log(err)
            }
        )
    }, [])

    return (
        <View style={styles.container}>
            {/* BOX MAP */}
            <View style={styles.boxMap}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    camera={{
                        center: {
                            latitude: region.latitude,
                            longitude: region.longitude,
                        },
                        altitude: region.altitude,
                        zoom,
                        pitch: 3,
                        heading: 3,
                    }}
                    // onUserLocationChange={onUserLocationChange}
                    showsUserLocation={true}
                    followsUserLocation={true}
                >
                    <Marker
                        coordinate={{
                            latitude: region.latitude,
                            longitude: region.longitude,
                        }}
                    />
                </MapView>
            </View>

            {/* BOX BUTTON */}
            <View style={styles.boxButton}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={decreaseScale}
                >
                    <Text>Giam</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={increaseScale}>
                    <Text>Tang</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UpdateLocation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange'
    },
    boxMap: {
        flex: 8,
        overflow: 'hidden',
        backgroundColor: 'lightblue'
    },
    boxButton: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 20,
        // backgroundColor: 'lightblue',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    map: {
        ...StyleSheet.absoluteFillObject,
    },

    button: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
