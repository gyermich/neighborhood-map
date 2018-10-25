import React, { Component } from 'react';

class SideBar extends Component {
  state = {
    query: '',
  }

  handleSights = () => {
    const query = this.state.query

    if (query !== '') {
      // only display sights that match the query
      return this.props.sights.filter(sight =>
        sight.venue.name.toLowerCase().includes(query)
      )
    } else {
      // if no query display all sights
      return this.props.sights
    }
  }

  handleChange = e => {
    const query = e.target.value.trim().toLowerCase()
    this.setState({ query })

    const markers = this.props.sights.map(sight => {
      // do any of the current sight names match the query?
      const queryMatch = sight.venue.name.toLowerCase().includes(query)
      // find markers corresponding to the matched sight
      const marker = this.props.markers.find(marker => marker.id === sight.venue.id)
      // if query matches set isVisible to true (or false if no match)
      marker.isVisible = Boolean(queryMatch)
      return marker
    })

    return this.props.updateMarkers(markers)
  }

    render() {
        return (
          <div className='sidebar'>
          <input
            type={"search"}
            id={"search"}
            placeholder={"filter"}
            onChange={this.handleChange}
            />
          <ul className='sight-list'>
            {this.handleSights().map((sight) =>
              <li
                key={sight.venue.id}
                tabIndex="2"
                onClick={() => this.props.handleListItem(sight)}
              >
                <img
                  src={sight.venue.categories[0].icon.prefix + '32'+ sight.venue.categories[0].icon.suffix}
                  alt={sight.venue.categories[0] + 'Icon'}
                />
                <div>{sight.venue.name}</div>
              </li>
            )}
          </ul>
          </div>
        );
    }
}


export default SideBar;
