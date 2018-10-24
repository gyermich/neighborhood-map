import React, { Component, Fragment } from 'react';
import './App.css';
import Map from './Map'
import SideBar from './SideBar'
import { fetchTokyoSights } from './utils/api'

class App extends Component {
  state = {
    sights: [],
    markers: [],
    center: [],
    zoom: 10,
  }

  closeAllInfoWindows = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false
      return marker
    })
    this.setState({ markers })
  }

  handleMarkerClick = marker => {
    this.closeAllInfoWindows()
    marker.isOpen = true;

    this.setState({
      markers: [...this.state.markers, marker]
    })
  }

  getSights = () => {
    fetchTokyoSights()
      .then(response => {
        const sights = response.data.response.groups[0].items
        const center = response.data.response.geocode.center
        const markers = sights.map(sight => {
          return {
            lat: sight.venue.location.lat,
            lng: sight.venue.location.lng,
            isOpen: false,
            isVisible: true,
            id: sight.venue.id
          }
        })
        this.setState({
          sights,
          center,
          markers,
        })
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
      <div className='container'>
      <SideBar {...this.state}/>
       <Map {...this.state}
        handleMarkerClick={this.handleMarkerClick}/>
     </div>
    );
  }
}


export default App;
