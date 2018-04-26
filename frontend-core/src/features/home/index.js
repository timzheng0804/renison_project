import './home.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.routes';
import HomeController from './home.controller';
import BaseModalService from '../../services/BaseModalService';
import BaseToastService from '../../services/BaseToastService';
export default angular.module('app.home', [uirouter,BaseModalService,BaseToastService])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;
