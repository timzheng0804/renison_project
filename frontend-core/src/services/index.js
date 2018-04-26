import angular from 'angular';

import BaseService from "./BaseService";

import BaseModalService from './BaseModalService';
import BaseToastService from './BaseToastService';
export default angular.module("ept.common.services",[BaseService,BaseModalService,BaseToastService])
.name;