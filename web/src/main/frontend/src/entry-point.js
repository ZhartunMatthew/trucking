import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import UserRole from './components/userRole';
import { Router, Route, browserHistory } from 'react-router';
require('./styles/app.css');

require('jquery/dist/jquery.min.js');
require('tether/dist/css/tether.min.css');
require('tether/dist/js/tether.min.js');
require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/js/bootstrap.min.js');

let store = configureStore();

//When using Redux, you should wrap you component into Provider component. It "enables" connect function
render((
	<Provider store={store}>
      <UserRole/>
	</Provider>
), document.getElementById('app'));
