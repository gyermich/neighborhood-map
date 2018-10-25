import React, { Component } from 'react';
import Map from './Map'
import SideBar from './SideBar'
import { fetchTokyoSights } from '../utils/api'

class App extends Component {
  state = {
    sights: [],
    markers: [],
    center: [],
    zoom: 10,
  }

  updateMarkers = (markers) => {
    this.setState({ markers })
  }

  closeAllInfoWindows = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false
      marker.icon = 'spotlight-waypoint-b'
      return marker
    })
    this.setState({ markers })
  }

  handleMarkerClick = marker => {
    // if any other infowindows are open, close them first
    this.closeAllInfoWindows()
    // now open marker that was clicked
    marker.isOpen = true;
    marker.icon = 'spotlight-waypoint-a'

    this.setState({
      markers: [...this.state.markers, marker]
    })
  }

  handleListItem = sight => {
    // find and open marker with the same venue id
    const marker = this.state.markers.find(marker => marker.id === sight.venue.id)
    this.handleMarkerClick(marker)
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
            id: sight.venue.id,
            icon: 'spotlight-waypoint-b'
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
      <SideBar {...this.state}
        handleListItem={this.handleListItem}
        updateMarkers={this.updateMarkers}
        />
       <Map {...this.state}
        handleMarkerClick={this.handleMarkerClick}/>
     </div>
    );
  }
}


export default App;
