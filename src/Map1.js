import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class Map extends Component {

    initMap = () => {
      const google_maps = window.google.maps
      const map = new google_maps.Map(document.getElementById('map'), {
        // center map in Tokyo by default
        center: {lat: 35.652832, lng: 139.839478},
        zoom: 10
      })
      const infowindow = new google_maps.InfoWindow()

      // create marker for each sight
      this.props.sights.forEach(sight => {
        const marker = new google_maps.Marker({
            position: {
              lat: sight.venue.location.lat,
              lng: sight.venue.location.lng},
            map: map,
            title: sight.venue.name
          })
        const content = `${sight.venue.name} (${sight.venue.categories[0].name})`
        // add infowindow to each marker
        marker.addListener('click', function() {
          infowindow.setContent(content)
          infowindow.open(map, marker);
        })
      })
    }

    loadScript = (url) => {
      const index = window.document.getElementsByTagName("script")[0]
      const script = window.document.createElement("script")
      script.src = url
      script.async = true
      script.defer = true
      index.parentNode.insertBefore(script, index)
    }

    loadMap = () => {
      this.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBROPR4-7MpztgTOr2x44yrh_hoLMLplUE&callback=initMap')
      window.initMap = this.initMap
    }

    componentDidMount() {
      this.loadMap()
    }

    render() {
        return (
          <div id="map"></div>
        );
    }
}


export default Map;
