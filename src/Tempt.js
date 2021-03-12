import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Text } from 'react-native';
import MapView from 'react-native-maps';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class GeoMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapRegion: null,
            lastLat: null,
            lastLong: null,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5 * (screenWidth / screenHeight),
            statusBarHeight: 0,
        }
    }

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5 * (width / height)
            }
            this.onRegionChange(region, region.latitude, region.longitude);
            this._map.animateToRegion(region, 100);
        }, function (error) { alert(error) });
    }

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
            mapRegion: region,
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
        });
    }

    componentWillMount() {
        setTimeout(() => this.setState({ statusBarHeight: screenHeight - 74 }), 500);
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    onPressZoomIn() {
        region = {
            latitude: this.state.lastLat,
            longitude: this.state.lastLong,
            ltDelta: this.state.latitudeDelta * 10,
            lgDelta: this.state.longitudeDelta * 10
        }
        this.setState = {
            latitudeDelta: region.ltDelta,
            longitudeDelta: region.lgDelta,
            lastLat: region.latitude,
            lastLong: region.longitude
        }
        this._map.animateToRegion(region, 100);
    }

    onPressZoomOut() {
        region = {
            latitude: this.state.lastLat,
            longitude: this.state.lastLong,
            ltDelta: this.state.latitudeDelta / 10,
            lgDelta: this.state.longitudeDelta / 10
        }
        this.setState = {
            latitudeDelta: region.ltDelta,
            longitudeDelta: region.lgDelta,
            lastLat: region.latitude,
            lastLong: region.longitude
        }
        this._map.animateToRegion(region, 100);
        console.log('lt : ' + region.ltDelta + ' lg : ' + region.lgDelta)
    }



    render() {

        return (
            <View style={{ paddingTop: this.state.statusBarHeight }}>
                <MapView
                    ref={component => { this._map = component; }}
                    customMapStyle={mapStyle}
                    style={styles.map}
                    region={this.state.mapRegion}
                    showsUserLocation={true}
                    followUserLocation={true}
                    showsMyLocationButton={true}
                    zoomEnabled={true}
                    onRegionChange={this.onRegionChange.bind(this)}

                >
                </MapView>
                <TouchableOpacity
                    style={styles.zoomIn}
                    onPress={() => { this.onPressZoomIn() }}
                >
                    <Icon
                        name="plus"
                        style={styles.icon}
                        size={20}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.zoomOut}
                    onPress={() => { this.onPressZoomOut() }}
                >
                    <Icon
                        name="minus"
                        style={styles.icon}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

export default GeoMap;