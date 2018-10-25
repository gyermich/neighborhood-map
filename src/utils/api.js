import axios from 'axios'

export function fetchTokyoSights() {
  // get list of popular sight seeing places from Forsquare
  const endpoint = 'https://api.foursquare.com/v2/venues/explore?'
  const params = {
    client_id: 'RCS1LDEMPSIEXRL5OTVLJAG0NRXJX5I30K1AAFJBZMODB3LW',
    client_secret: 'S51CYXWC2PUL0E2XILOPFL3DRZTP3WWW14SSNGVW5VTK4FDI',
    query: 'sights',
    near: 'Tokyo',
    v: '20181023'
  }

  return axios.get(endpoint + new URLSearchParams(params))
}
