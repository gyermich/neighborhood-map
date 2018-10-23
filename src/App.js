import React, { Component } from 'react';
import './App.css';

class App extends Component {
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
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


export default App;
