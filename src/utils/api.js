import axios from 'axios'

export function fetchTokyoSights() {
  // get list of popular sight seeing places from Forsquare
  const endpoint = 'https://api.foursquare.com/v2/venues/explore?'
  const params = {
    client_id: '',
    client_secret: '',
    query: 'sights',
    near: 'Tokyo',
    v: '20181023'
  }

  return axios.get(endpoint + new URLSearchParams(params))
}
