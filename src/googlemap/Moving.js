import React, { useState, useEffect, useRef } from 'react'
import {
    StyleSheet,
    Text, View, TouchableOpacity, Dimensions
} from 'react-native'
import MapView,
{ PROVIDER_GOOGLE, Marker, Polyline, MarkerAnimated, AnimatedRegion }
    from 'react-native-maps'
import geolocation from 'react-native-geolocation-service'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

// {"latitude": 21.158784797312904, "longitude": 105.42525697499514}

const Moving = () => {
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 46.246901426376745,
        longitude: -161.91639125347137,
        altitude: 13,
    })
    // const currentLocation = useRef(
    //     new AnimatedRegion({
    //         latitude: 46.246901426376745,
    //         longitude: -161.91639125347137,
    //         altitude: 13,
    //     })
    // ).current
    const [zoom, setZoom] = useState(5);

    const [departure, setDeparture] = useState({
        latitude: 46.246901426376745,
        longitude: -161.91639125347137,
    })
    const [destination, setDestination] = useState({
        latitude: 29.155882199663207,
        longitude: 114.97251257300378,
    })
    // markerFocus to focus to MarkerAnimated to set Animation
    const markerFocus = useRef(null);

    /**
     * FUNCTIONS HELP PROGRAM 
     */
    const onDragEndDestination = pos => {
        console.log(pos.nativeEvent.coordinate);
        setDestination({
            ...destination,
            latitude: pos.nativeEvent.coordinate.latitude,
            longitude: pos.nativeEvent.coordinate.longitude,
        })
    }

    const [status, setStatus] = useState(true)
    const DURATION = 10000;
    const letGo = () => {
        console.log("let's go")
        if (markerFocus.current) {
            if (status) {
                markerFocus.current.animateMarkerToCoordinate(
                    destination, DURATION
                );
            } else {
                markerFocus.current.animateMarkerToCoordinate(
                    departure, DURATION
                );
            }
            setStatus(!status);
        } else console.log('Still not go');
    }

    useEffect(() => {
        geolocation.getCurrentPosition(
            pos => {
                setCurrentLocation({
                    ...currentLocation,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                });
                setDeparture({
                    ...departure,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                })
                // currentLocation = {
                //     ...currentLocation,
                //     latitude: pos.coords.latitude,
                //     longitude: pos.coords.longitude,
                // }
            },
            err => console.log('Error: \n', err),
            { enableHighAccuracy: true }
        )
    }, [])

    return (
        <View style={styles.container}>
            {/* MAP VIEW */}
            <View style={styles.boxMap}>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    camera={{
                        center: {
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        },
                        altitude: currentLocation.altitude,
                        zoom,
                        pitch: 3,
                        heading: 3,
                    }}
                // showsUserLocation={true}
                >
                    {/* MARKER DEPARTURE PLACE */}
                    <Marker
                        coordinate={{
                            latitude: departure.latitude,
                            longitude: departure.longitude,
                        }}
                    >
                        <Entypo
                            name='home'
                            style={{
                                fontSize: 0,
                                color: 'purple'
                            }}
                        />
                    </Marker>
                    {/* MARKER DESTINATION PLACE */}
                    <Marker
                        coordinate={{
                            latitude: destination.latitude,
                            longitude: destination.longitude,
                        }}
                        draggable
                        onDragEnd={onDragEndDestination}

                    />
                    {/* MARKER FOR CURRENT LOCATION */}
                    <MarkerAnimated
                        ref={ref => markerFocus.current = ref}
                        coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        }}
                    >
                        <FontAwesome5
                            name='car-side'
                            style={{
                                fontSize: 30,
                                color: 'green'
                            }}
                        />
                    </MarkerAnimated>

                    {/* POLYLINE CONNECT DEPARTURE AND CURRENT */}
                    <Polyline
                        coordinates={[
                            { latitude: departure.latitude, longitude: departure.longitude },
                            { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
                        ]}
                        strokeColor='green'
                        strokeWidth={3}
                    />
                    {/* POLYLINE CONNECT CURRENT AND DESTINATIN */}
                    <Polyline
                        coordinates={[
                            { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
                            { latitude: destination.latitude, longitude: destination.longitude },
                        ]}
                        strokeColor='red'
                        strokeWidth={3}
                    />
                </MapView>
            </View>

            {/* BOX CONTROL VIEW */}
            <View style={styles.boxControl}>
                <TouchableOpacity style={styles.buttonScale} onPress={() => setZoom(zoom / 1.2)}>
                    <Text>Giam</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonGo} onPress={letGo}>
                    <Text>Play</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonScale} onPress={() => setZoom(zoom * 1.2)}>
                    <Text>Tang</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Moving

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    boxMap: {
        flex: 8
    },
    boxControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'purple',
    },

    map: {
        ...StyleSheet.absoluteFillObject,
    },

    buttonScale: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonGo: {
        width: 100,
        height: 50,
        borderRadius: 30,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    }
})
