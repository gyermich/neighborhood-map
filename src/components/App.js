import React, { Component } from 'react';
import Map from './Map'
import SideBar from './SideBar'
import { fetchTokyoSights } from '../utils/api'

class App extends Component {
  state = {
    sights: [],
    markers: [],
    center: [],
    zoom: 12,
    hasError: false
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

  handleMarkerClick = clickedMarker => {
    // if any other markers are open, close them first
    this.closeAllInfoWindows()

    this.setState({
       ...this.state,
       markers: this.state.markers.map(marker => marker.id === clickedMarker.id ?
           // transform the one with a matching id
           { ...marker, isOpen: true, icon: 'spotlight-waypoint-a' } :
           // otherwise return original marker
           marker
       )
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
        this.setState({ hasError: true })
          console.error('Error while trying to fetch places from Foursquare Places API: ', error)
      })
  }

  componentDidMount() {
    this.getSights()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error'>
          <h1>
            Oops! Foursquare API failed to fetch data.
            Try refreshing the page or check your browser console for more details.
          </h1>
        </div>
      )
    } else {
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
}


export default App;
