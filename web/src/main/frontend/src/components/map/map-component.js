/* global google */
import React from 'react';
import { updateOperation } from '../../actions/operation.action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Geocoder
} from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import { updateCheckPoints } from  '../../actions/checkPoint.action';
import {
  MAX_COUNT_OF_WAYPOINTS,
  INPUT_STYLE,
  DEFAULT_ZOOM,
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  METERS_PER_KILOMETER
}  from '../../constants/map.constants';

const DirectionsGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={DEFAULT_ZOOM}
    defaultCenter={props.center}
    onClick={props.onClick}
  >
    <SearchBox
      id='start-search-box'
      ref={props.onStartSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.handleStartSearchBox}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      inputPlaceholder='Departure place'
      inputStyle={INPUT_STYLE}
    />
    <SearchBox
      id='end-search-box'
      ref={props.onEndSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.handleEndSearchBox}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      inputPlaceholder='Destination place'
      inputStyle={INPUT_STYLE}
    />
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

class MapComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.handleOnMapClick = this.handleOnMapClick.bind(this);
    this.convertLocationIntoAddress = this.convertLocationIntoAddress.bind(this);
    this.calculateTotalDistance = this.calculateTotalDistance.bind(this);
    this.handleStartSearchBox = this.handleStartSearchBox.bind(this);
    this.handleStartSearchBoxMounted = this.handleStartSearchBoxMounted.bind(this);
    this.handleEndSearchBox = this.handleEndSearchBox.bind(this);
    this.handleEndSearchBoxMounted = this.handleEndSearchBoxMounted.bind(this);
    this.state = {
      start: null,
      waypoints: [],
      end: null,
      directions: null
    };
    this.defaultCenter = new google.maps.LatLng(DEFAULT_LATITUDE, DEFAULT_LONGITUDE);
    this.defaultBounds = new google.maps.LatLngBounds(this.defaultCenter, this.defaultCenter);
  }

  handleStartSearchBoxMounted(searchBox) {
    this._startSearchBox = searchBox;
  }

  handleEndSearchBoxMounted(searchBox) {
    this._endSearchBox = searchBox;
  }

  handleStartSearchBox() {
    this.state.start = this._startSearchBox.getPlaces()[0].geometry.location;
    this.convertLocationIntoAddress(this.state.start, 'departure');
  }

  handleEndSearchBox() {
    this.state.end = this._endSearchBox.getPlaces()[0].geometry.location;
    this.convertLocationIntoAddress(this.state.end, 'destination');
  }

  handleOnMapClick(event) {
    if (this.state.start && this.state.end && this.state.waypoints.length < MAX_COUNT_OF_WAYPOINTS) {
      this.state.waypoints.push({
        location: event.latLng,
        stopover: false
      });
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({'location': event.latLng}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          let checkPoint = {
            description: results[0].formatted_address,
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng()
          };
          this.props.updateCheckPoints(checkPoint);
          this.props.updateOperation(null, {});
          this.props.updateOperation('currentCheckPointDescription', '');
          this.props.updateOperation('currentCheckPointLatitude', '');
          this.props.updateOperation('currentCheckPointLongitude', '');
          this.handleRouteChange();
        }
      });
    }
  }

  handleRouteChange() {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: this.state.start,
      destination: this.state.end,
      waypoints: this.state.waypoints,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: response
        });
        this.calculateTotalDistance(response.routes[0].legs);
      } else {
        console.error('error fetching directions ${result}');
      }
    });
  }

  calculateTotalDistance(legs) {
    let totalDistance = 0;
    for(let leg of legs) {
      totalDistance += leg.distance.value;
    }
    totalDistance /= METERS_PER_KILOMETER;
    this.props.updateOperation('totalDistance', totalDistance);
  }

  convertLocationIntoAddress(location, fieldPrefix) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': location}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        let address_component = {};
        for(let component of results[0].address_components) {
          address_component[component.types[0]] = component.long_name;
        }
        this.props.updateOperation(fieldPrefix + 'Address', results[0].formatted_address);
        this.props.updateOperation(fieldPrefix + 'Country', address_component.country);
        this.props.updateOperation(fieldPrefix + 'City', address_component.locality);
        this.props.updateOperation(fieldPrefix + 'Street', address_component.route);
        this.props.updateOperation(fieldPrefix + 'House', address_component.street_number);
        if (this.state.start && this.state.end) {
          this.handleRouteChange();
        }
      }
    });
  }

  render() {
    let directions = this.state.directions === null ? {routes: []} : this.state.directions;
    return (
      <DirectionsGoogleMap
        containerElement={
          <div style={{ height: '85%',  width: '50%', position: 'fixed' }} />
        }
        mapElement={
          <div style={{ height: '100%', width: '100%' }} />
        }
        center={this.defaultCenter}
        bounds={this.defaultBounds}
        onClick={this.handleOnMapClick}
        directions={directions}
        handleStartSearchBox={this.handleStartSearchBox}
        handleEndSearchBox={this.handleEndSearchBox}
        onStartSearchBoxMounted={this.handleStartSearchBoxMounted}
        onEndSearchBoxMounted={this.handleEndSearchBoxMounted}
      />
    );
  }
}

MapComponent.propTypes = {
  waybill: React.PropTypes.object.isRequired,
  updateOperation: React.PropTypes.func.isRequired,
  updateCheckPoints: React.PropTypes.func.isRequired
};

let mapStateToProps = function (state) {
  return {
    waybill: state.operation.modifiedValue,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateOperation: bindActionCreators(updateOperation, dispatch),
    updateCheckPoints: bindActionCreators(updateCheckPoints, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
