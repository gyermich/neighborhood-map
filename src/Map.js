import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow  } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    zoom={props.zoom}
    defaultCenter={{ lat: 35.652832, lng: 139.839478 }} // Tokyo
    center={props.center}
  >
    {props.markers &&
        props.markers
            .filter(marker => marker.isVisible)
            .map((marker, index) => {
                // associate matching sight to the marker
                const sight = props.sights.find(sight => sight.venue.id === marker.id)
                return <Marker
                    key={index}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => props.handleMarkerClick(marker)}
                >
                    {marker.isOpen
                        &&
                        <InfoWindow>
                        <div> {sight.venue.name} ({sight.venue.categories[0].name})</div>
                        </InfoWindow>}
                </Marker>
    })}
  </GoogleMap>
));

export default class Map extends Component {
    render() {
        return (
            <MyMapComponent
                {...this.props}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBROPR4-7MpztgTOr2x44yrh_hoLMLplUE"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100vh`, width: '75%' }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}

