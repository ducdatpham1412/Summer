import React, { useState, useEffect, useRef } from 'react'
import {
    StyleSheet,
    Text, View, Dimensions, TouchableOpacity
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps'
import geolocation from 'react-native-geolocation-service'

const ALTITUDE = 14.228620446048385;


const Region = () => {

    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        altitude: ALTITUDE,
    })
    const [zoom, setZoom] = useState(5)
    const mapFocus = useRef(null)

    const [listMarkView, setListMarkView] = useState([
        {
            coordinate: {
                latitude: region.latitude,
                longitude: region.longitude,
            }
        }
    ])


    useEffect(() => {
        geolocation.getCurrentPosition(pos => {
            setRegion({
                ...region,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                altitude: pos.coords.altitude
            })
        })
    }, [])

    const onPanDrag = (res) => {
        console.log(res.nativeEvent.coordinate)
        setRegion({
            ...region,
            latitude: res.nativeEvent.coordinate.latitude,
            longitude: res.nativeEvent.coordinate.longitude,
        })
    }

    const getCamera = async () => {
        if (mapFocus.current) {
            try {
                const camera = await mapFocus.current.getCamera();
                // setListMarkView(listMarkView.concat({
                //     coordinate: {
                //         latitude: camera.nativeEvent.coordinate.latitude,
                //         longitude: camera.nativeEvent.container.longitude,
                //     }
                // }))
                console.log(camera);
            } catch (err) {
                console.log('err: ', err)
            }
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.mapBox}>
                <MapView
                    ref={ref => mapFocus.current = ref}
                    style={{ ...StyleSheet.absoluteFillObject }}
                    provider={PROVIDER_GOOGLE}
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
                    showsUserLocation={true}
                    onPanDrag={onPanDrag}
                    onPress={getCamera}
                >
                    {/* {
                        listMarkView.map(item=>(
                            <MapView
                                key={item.coordinate.latitude}
                                coordinate={...item.coordinate}
                            />
                        ))
                    } */}

                    <Marker
                        coordinate={{
                            latitude: region.latitude,
                            longitude: region.longitude,
                        }}
                    />

                    <Polyline
                        coordinates={[
                            { latitude: 37.8025259, longitude: -122.4351431 },
                            { latitude: region.latitude, longitude: region.longitude }
                        ]}
                        strokeColor='red'
                        strokeWidth={3}
                    />
                </MapView>
            </View>
            <View style={styles.controlBox}>
                <TouchableOpacity style={styles.button} onPress={() => setZoom(zoom / 3)}>
                    <Text>Giam</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setZoom(zoom * 3)}>
                    <Text>Tang</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Region

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    mapBox: {
        flex: 8
    },
    controlBox: {
        flex: 1,
        backgroundColor: 'lightblue',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
