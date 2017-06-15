/* global google */
import React from 'react';
import { updateOperation } from '../../actions/operation.action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withGoogleMap, GoogleMap, DirectionsRenderer, Geocoder, Marker} from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import $ from 'jquery';
import { updateCheckPoints, deleteCheckPoint } from  '../../actions/checkPoint.action';
import { passCheckPoint } from '../../actions/driverWaybills.action';
import { DEFAULT_LONGITUDE, DEFAULT_LATITUDE, DEFAULT_ZOOM, GREEN_ICON, RED_ICON,
METERS_PER_KILOMETER, INPUT_STYLE, MAX_COUNT_OF_WAYPOINTS} from '../../constants/map.constants';
import { Role } from '../../constants/roles';

const DirectionsGoogleMap = withGoogleMap(props => (
  <GoogleMap defaultZoom={DEFAULT_ZOOM} defaultCenter={props.center} onClick={props.onClick}>
    {props.isManager ?
      <div>
        <SearchBox
          ref={props.onStartSearchBoxMounted}
          bounds={props.bounds}
          onPlacesChanged={props.handleStartSearchBox}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          inputPlaceholder='Departure place'
          inputStyle={INPUT_STYLE}
        />
        <SearchBox
          ref={props.onEndSearchBoxMounted}
          bounds={props.bounds}
          onPlacesChanged={props.handleEndSearchBox}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          inputPlaceholder='Destination place'
          inputStyle={INPUT_STYLE}
        />
      </div> : null
    }
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onClick={() => props.onMarkerClick(marker)}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

class MapComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    let isManager = this.props.userRole === Role.MANAGER;
    this._params = {
      handleOnMapClick: isManager ? this.handleOnMapClick.bind(this) : $.noop,
      handleOnMarkerClick: isManager ? $.noop : this.handleOnMarkerClick.bind(this),
      handleStartSearchBox: isManager ? this.handleStartSearchBox.bind(this) : $.noop,
      handleEndSearchBox: isManager ? this.handleEndSearchBox.bind(this) : $.noop,
      handleStartSearchBoxMounted: isManager ? this.handleStartSearchBoxMounted.bind(this) : $.noop,
      handleEndSearchBoxMounted: isManager ? this.handleEndSearchBoxMounted.bind(this) : $.noop,
      handleOnMarkerRightClick: isManager ? this.handleOnMarkerRightClick.bind(this) : $.noop,
      isManager: isManager
    };
    this.state = {
      start: null,
      waypoints: [],
      end: null,
      directions: null,
      markers: []
    };
    this.defaultCenter = new google.maps.LatLng(DEFAULT_LATITUDE, DEFAULT_LONGITUDE);
    this.defaultBounds = new google.maps.LatLngBounds(this.defaultCenter, this.defaultCenter);
    if (isManager) {
      this.convertLocationIntoAddress = this.convertLocationIntoAddress.bind(this);
      this.calculateTotalDistance = this.calculateTotalDistance.bind(this);
      this.state.markersToWaypointsMap = new Map();
    } else {
      this.initState = this.initState.bind(this);
      this.initState();
      this.handleRouteChange();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userRole === Role.DRIVER) {
      let nextMarkers = [];
      for (let checkPoint of nextProps.waybill.checkPoints) {
        nextMarkers.push({
          position: new google.maps.LatLng(checkPoint.latitude, checkPoint.longitude),
          key: checkPoint.id,
          icon: checkPoint.pathDate ? GREEN_ICON : RED_ICON,
          clickable: checkPoint.pathDate === null
        });
      }
      this.setState({
        markers: nextMarkers
      })
    }
  }

  initState() {
    for (let checkPoint of this.props.waybill.checkPoints) {
      let marker = {
        position: new google.maps.LatLng(checkPoint.latitude, checkPoint.longitude),
        key: checkPoint.id,
        icon: checkPoint.pathDate ? GREEN_ICON : RED_ICON,
        clickable: checkPoint.pathDate === null
      };
      this.state.markers.push(marker);
      let waypoint = {
        location: new google.maps.LatLng(checkPoint.latitude, checkPoint.longitude),
        stopover: false
      };
      this.state.waypoints.push(waypoint);
    }
    this.state.start = new google.maps.LatLng(this.props.waybill.departureLatitude,
      this.props.waybill.departureLongitude);
    this.state.end = new google.maps.LatLng(this.props.waybill.destinationLatitude,
      this.props.waybill.destinationLongitude);
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
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({location: event.latLng}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          let marker = {
            position: event.latLng,
            key: Date.now()
          };
          this.state.markers.push(marker);
          let waypoint = {
            location: event.latLng,
            stopover: false
          };
          this.state.waypoints.push(waypoint);
          this.state.markersToWaypointsMap.set(marker.key, waypoint);
          let checkPoint = {
            description: results[0].formatted_address,
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng(),
            key: marker.key
          };
          this.props.updateCheckPoints(checkPoint);
          this.handleRouteChange();
        }
      });
    }
  }

  handleOnMarkerRightClick(targetMarker) {
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    let targetWaypoint = this.state.markersToWaypointsMap.get(targetMarker.key);
    const nextWaypoints = this.state.waypoints.filter(waypoint => waypoint !== targetWaypoint);
    this.setState({
      markers: nextMarkers,
      waypoints: nextWaypoints
    });
    this.props.deleteCheckPoint(targetMarker.key);
    this.handleRouteChange();
  }

  handleOnMarkerClick(targetMarker) {
    let index = this.state.markers.findIndex(marker => marker === targetMarker);
    this.state.markers[index].icon = GREEN_ICON;
    this.state.markers[index].clickable = false;
    let checkPoint = this.props.waybill.checkPoints.find(checkPoint => checkPoint.id === targetMarker.key);
    this.props.passCheckPoint(checkPoint);
    const nextMarkers = this.state.markers;
    this.setState({
      markers: nextMarkers
    });
  }

  handleRouteChange() {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: this.state.start,
      destination: this.state.end,
      waypoints: this.state.waypoints,
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result
        });
        if (this.props.userRole === Role.MANAGER) {
          this.calculateTotalDistance(result.routes[0].legs);
        }
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
    geocoder.geocode({location: location}, (results, status) => {
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
        this.props.updateOperation(fieldPrefix + 'Latitude', results[0].geometry.location.lat());
        this.props.updateOperation(fieldPrefix + 'Longitude', results[0].geometry.location.lng());
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
        onClick={this._params.handleOnMapClick}
        directions={directions}
        handleStartSearchBox={this._params.handleStartSearchBox}
        handleEndSearchBox={this._params.handleEndSearchBox}
        onStartSearchBoxMounted={this._params.handleStartSearchBoxMounted}
        onEndSearchBoxMounted={this._params.handleEndSearchBoxMounted}
        onMarkerClick={this._params.handleOnMarkerClick}
        onMarkerRightClick={this._params.handleOnMarkerRightClick}
        markers={this.state.markers}
        isManager={this._params.isManager}
      />
    );
  }
}

MapComponent.propTypes = {
  userRole: React.PropTypes.string.isRequired,
  waybill: React.PropTypes.object,
  updateOperation: React.PropTypes.func.isRequired,
  updateCheckPoints: React.PropTypes.func,
  deleteCheckPoint: React.PropTypes.func,
  passCheckPoint: React.PropTypes.func

};

let mapStateToProps = function (state) {
  return {
    userRole: state.userRole.userRole
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateOperation: bindActionCreators(updateOperation, dispatch),
    updateCheckPoints: bindActionCreators(updateCheckPoints, dispatch),
    deleteCheckPoint: bindActionCreators(deleteCheckPoint, dispatch),
    passCheckPoint: bindActionCreators(passCheckPoint, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
