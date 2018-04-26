import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './basic-test.routes';
import basicTestController from './basic-test.controller';
import allDirectives from "../../directives/";
export default angular.module('app.basic-test', [uirouter, allDirectives])
  .config(routing)
  .controller('BasicTestController', basicTestController)
  .name;
