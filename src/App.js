import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

  state = {
    sights: []
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 35.652832, lng: 139.839478},
      zoom: 10
    })

    this.state.sights.forEach(sight => {
      new window.google.maps.Marker({
          position: {
            lat: sight.venue.location.lat,
            lng: sight.venue.location.lng},
          map: map,
          title: sight.venue.name
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

  getSights = () => {
    const endpoint = 'https://api.foursquare.com/v2/venues/explore?'
    const params = {
      client_id: '',
      client_secret: '',
      query: 'sights',
      near: 'Tokyo',
      v: '20181023'
    }

    axios.get(endpoint + new URLSearchParams(params))
      .then(response => {
        this.setState({
          sights: response.data.response.groups[0].items
        },     this.loadMap())
      })
      .catch(error => {
        console.log("ERROR: ", error)
      })
  }

  componentDidMount() {
    this.getSights()
  }

  render() {
    return (
      <div id="map"></div>
    );
  }
}


export default App;
