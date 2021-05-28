import React from 'react';
import PageTitle from './page-title';
import TravelEntry from './travel-entry';

export default class TravelDiary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeVisited: '',
      date: '',
      favoriteMoments: '',
      lat: '',
      long: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPlaceSelected = this.onPlaceSelected.bind(this);
  }

  onPlaceSelected(place) {
    const addressArray = place.address_components;
    const placeName = addressArray[0].long_name;
    this.setState({
      placeVisited: placeName,
      lat: place.geometry.location.lat(),
      long: place.geometry.location.lng()
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newMemory = {
      placeVisited: this.state.placeVisited,
      date: this.state.date,
      favoriteMoments: this.state.favoriteMoments,
      lat: this.state.lat,
      long: this.state.long
    };
    this.props.onSubmit(newMemory);
    this.setState({ placeVisited: '', date: '', favoriteMoments: '' });
  }

  render() {
    return (
    <>
      <PageTitle text="New Entry" />
      <TravelEntry
        onSubmit={this.handleSubmit}
        autocompleteInput={this.onPlaceSelected}
        handleChange={this.handleChange}
        date={this.state.date}
        favoriteMoments={this.state.favoriteMoments}
      />
    </>
    );
  }
}
