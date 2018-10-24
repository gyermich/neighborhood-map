import React, { Component } from 'react';
import './App.css';
import axios from 'axios'


class SideBar extends Component {
  state = {
    sights: [],
    markers: [],
    query: '',

  }
  filterSights = () => {

  }
  handleChange = e => {
    const query = e.target.value.toLowerCase()
    const filtered_sights = this.state.sights.filter(sight =>
      sight.venue.name.toLowerCase().includes(query)
      )
    this.setState({
      query,
      sights: filtered_sights
    })
    // const markers = this.props.sights.filter(sight =>
    //     sight.venue.name.toLowerCase().includes(query)
    //   )
  }

  componentDidMount() {
    this.setState({ sights: this.props.sights })
  }
    render() {
      const sights = this.state.sights
      console.log("STATE?", this.state)
        return (
          <div className='sidebar'>
          <input
            type={"search"}
            id={"search"}
            placeholder={"filter"}
            onChange={this.handleChange}
            />
          <ul>
            {sights.map((sight) =>
              <li >foo {sight.venue.name}</li>
            )}
          </ul>
          </div>
        );
    }
}


export default SideBar;
