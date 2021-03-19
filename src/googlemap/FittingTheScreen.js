import React, { useState, useEffect, useRef } from 'react'
import {
    StyleSheet,
    Text, View, TouchableOpacity,
} from 'react-native'
import
MapView,
{ PROVIDER_GOOGLE, Marker, MarkerAnimated }
    from 'react-native-maps'
import geolocation from 'react-native-geolocation-service'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// Trung khanh: {"latitude": 21.158784797312904, "longitude": 105.42525697499514}

// De La Thanh: 21.021516326261548 - 105.82776568830013
// Ho Guom: 21.028696755444773 - 105.85230588912965

// FITTING THE SCREEN, AUTO ROTATE CAMERA FOLLOW DIRECTION USER GO


const FittingTheScreen = () => {

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 21.021516326261548,
        longitude: 105.82776568830013,
    })
    const [zoom, setZoom] = useState(5);

    const [departure, setDeparture] = useState({
        latitude: 21.021516326261548,
        longitude: 105.82776568830013,
    })
    const [destination, setDestination] = useState({
        latitude: 21.028696755444773,
        longitude: 105.85230588912965,
    })

    // markerFocus to focus to MarkerAnimated to set Animation
    const markerFocus = useRef(null);
    const mapFocus = useRef(null);

    /**
     * FUNCTIONS WHEN DRAG END THE DESTINATION 
     */
    const onDragEndDestination = (pos, index) => {
        // console.log(pos.nativeEvent.coordinate);
        setDestination({
            ...destination,
            latitude: pos.nativeEvent.coordinate.latitude,
            longitude: pos.nativeEvent.coordinate.longitude,
        })
    }
    /**
     * THIS BLOCK IS 4 FUNCTIONS HELP AUTO ROTATE CAMERA FOLLOW DIRECTION USERS
     */
    // const [currentHeading, setCurrentHeading] = useState(0);
    // const convertToPoint = async (coordinateA, coordinateB) => {
    //     if (mapFocus.current) {
    //         const pointA = await mapFocus.current.pointForCoordinate(coordinateA);
    //         const pointB = await mapFocus.current.pointForCoordinate(coordinateB);
    //         return {
    //             pointA,
    //             pointB,
    //         }
    //     }
    // }
    // const calculateRotateCamera = (points) => {
    //     const pointA = points.pointA;
    //     const pointB = points.pointB;

    //     if ((pointB.y - pointA.y) != 0) {
    //         const tan = (pointB.x - pointA.x) / (pointB.y - pointA.y);
    //         const angle = (Math.atan(tan) / Math.PI) * 180;
    //         const newPosition = (pointB.y > pointA.y) ? 'up' : 'down';
    //         console.log('angle: \n', angle);
    //         controlRotateCamera(newPosition, angle);
    //     }
    //     console.log('points haha: \n', points);
    // }
    // const controlRotateCamera = (position, angle) => {
    //     if (position == 'up') {
    //         activeRotateCamera(angle);
    //     } else if (position == 'down') {
    //         activeRotateCamera(angle > 0 ? -(180 - angle) : (180 + angle));
    //     }
    // }
    // const activeRotateCamera = (angle) => {
    //     if (mapFocus.current) {
    //         let newHeading = currentHeading + angle;
    //         mapFocus.current.animateCamera({
    //             heading: newHeading,
    //         }, { duration: 4000 });
    //         if (newHeading >= 360) newHeading -= 360;
    //         else if (newHeading <= -360) newHeading += 360;
    //         setCurrentHeading(newHeading);
    //     }
    // }
    /**
     * --------------------------------------------------------------
     */

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
                mapFocus.current.fitToElements(true);
            },
            err => console.log('Error: \n', err),
            { enableHighAccuracy: true }
        )
        /**
        * UPDATING THE LOCATION
        */
        geolocation.watchPosition(
            async (pos) => {
                console.log('Updating current location: \n', pos);
                /**
                 * THIS BLOCK TO AUTO ROTATE CAMERA TO DIRECTION USERS
                 * MARKER USER MOVE FROM A -> B
                 */
                // const coordinateA = {
                //     latitude: currentLocation.latitude,
                //     longitude: currentLocation.longitude,
                // }
                // const coordinateB = {
                //     latitude: pos.coords.latitude,
                //     longitude: pos.coords.longitude,
                // }
                // const points = await convertToPoint(coordinateA, coordinateB);
                // // console.log(points);
                // calculateRotateCamera(points);
                if ( mapFocus.current ) {
                    mapFocus.current.animateCamera({
                        heading: pos.coords.heading,
                    }, {duration: 1000})
                }
                /**
                 * -----------------------------------------------------
                 */
                setCurrentLocation({
                    ...currentLocation,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                })
            },
            err => console.log('Error while updating location: \n', err),
            { distanceFilter: 10, interval: 1000, enableHighAccuracy: true }
        )
    }, [])

    return (
        <View style={styles.container}>
            {/* MAP VIEW */}
            <View style={styles.boxMap}>
                <MapView
                    ref={ref => mapFocus.current = ref}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    initialCamera={{
                        center: {
                            latitude: (departure.latitude + destination.latitude) / 2,
                            longitude: (departure.longitude + destination.longitude) / 2,
                        },
                        altitude: 15,
                        zoom,
                        pitch: 50,
                        heading: 0,
                    }}
                    mapPadding={{ left: 30, right: 30, top: 30, bottom: 30 }}
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
                    >
                        <Entypo
                            name='home'
                            style={{
                                fontSize: 30,
                                color: 'red'
                            }}
                        />
                    </Marker>

                    {/* MARKER FOR CURRENT LOCATION */}
                    <MarkerAnimated
                        ref={ref => markerFocus.current = ref}
                        coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        }}
                    >
                        <MaterialCommunityIcons
                            name='human-greeting'
                            style={{
                                fontSize: 30,
                                color: 'purple'
                            }}
                        />
                    </MarkerAnimated>
                </MapView>
            </View>

            {/* BOX CONTROL VIEW */}
            <View style={styles.boxControl}>
                <TouchableOpacity style={styles.buttonScale} onPress={() => setZoom(zoom / 1.2)}>
                    <Text>Giam</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonGo}
                    // onPress={() => controlRotateCamera('up', 45)}
                    onPress={() => {
                        mapFocus.current.animateCamera({
                            heading: 45,
                        }, { duration: 3000 })
                    }}
                >
                    <Text>Play</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonScale} onPress={() => setZoom(zoom * 1.2)}>
                    <Text>Tang</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FittingTheScreen

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
