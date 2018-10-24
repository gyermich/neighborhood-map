import React, { Component, Fragment } from 'react';
import './App.css';
import axios from 'axios'
import Map from './Map'
import SideBar from './SideBar'

class App extends Component {
  state = {
    sights: [],
    markers: [],
    center: [],
    zoom: 10,
  }

  getSights = () => {
    // get list of popular sight seeing places from Forsquare
    const endpoint = 'https://api.foursquare.com/v2/venues/explore?'
    const params = {
      client_id: 'RCS1LDEMPSIEXRL5OTVLJAG0NRXJX5I30K1AAFJBZMODB3LW',
      client_secret: 'S51CYXWC2PUL0E2XILOPFL3DRZTP3WWW14SSNGVW5VTK4FDI',
      query: 'sights',
      near: 'Tokyo',
      v: '20181023'
    }

    axios.get(endpoint + new URLSearchParams(params))
      .then(response => {
        const sights = response.data.response.groups[0].items
        const center = response.data.response.geocode.center
        const markers = sights.map(sight => {
          return {
            lat: sight.venue.location.lat,
            lng: sight.venue.location.lng,
            isOpen: false,
            isVisible: true,
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
       <SideBar sights={this.state.sights}/>
       <Map {...this.state}/>
     </div>
    );
  }
}


export default App;
