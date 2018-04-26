// this is the main entry point for modules requiring core module
import 'bootstrap/dist/css/bootstrap.min.css';
require('bootstrap/dist/js/bootstrap.min.js');
import './lib/xeditable/xeditable.css';
import angular from 'angular';
import directives from "./directives";
import services from "./services";

// import exceptions from './exceptions'; do not import exceptions as it is not helping
export default angular.module('ept.common', [directives,services])

.name;
