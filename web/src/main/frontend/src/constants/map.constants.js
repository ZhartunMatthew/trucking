export const DEPARTURE_INPUT_STYLE = {
  boxSizing: 'border-box',
  MozBoxSizing: 'border-box',
  border: '1px solid transparent',
  width: '240px',
  height: '32px',
  marginTop: '10px',
  padding: '0 12px',
  borderRadius: '1px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '14px',
  outline: 'none',
  textOverflow: 'ellipses'
};

const MARGIN_LEFT = {
  marginLeft: '125px'
};

export const DESTINATION_INPUT_STYLE = Object.assign({}, DEPARTURE_INPUT_STYLE, MARGIN_LEFT);

export const MAX_COUNT_OF_WAYPOINTS = 21;
export const DEFAULT_LATITUDE = 53.9216192;
export const DEFAULT_LONGITUDE = 27.5694262;
export const DEFAULT_ZOOM = 7;
export const METERS_PER_KILOMETER = 1000;

export const ICONS = {
  RED_ICON: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  RED_END_ICON: 'https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-b.png' +
  '&text=B&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1',
  GREEN_ICON: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  GREEN_START_ICON: 'https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png' +
  '&text=A&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1',
  GREEN_END_ICON: 'https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png' +
  '&text=B&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1'
};
