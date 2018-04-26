import angular from 'angular';
import 'angular-modal-service';
require('textangular/dist/textAngular-sanitize');
/*
	for documentation, see: https://github.com/dwmkerr/angular-modal-service
*/

var angularModalService = 'angularModalService'; // name of module
export default angular.module('ept.common.BaseModalService',['ngSanitize',angularModalService])
.service('BaseModalService',['ModalService','$sanitize',function(ModalService,$sanitize){
	var BaseModalService = this;
	/*
		example inputs:{
			modalTitle:'hello',
			cancelText:'cancel',
			confirmText:'ok',
			modalBody:'<p>hi there </p>'
		}
	*/
	var confirmController = ['$scope','close','modalTitle',
	'modalBody','confirmText','cancelText',
		function($scope,close,modalTitle,modalBody,confirmText,cancelText){
				$scope.close = function(result){
					close(result,200);
				};
				$scope.modalTitle = modalTitle;
				$scope.modalBody = modalBody;
				$scope.confirmText = confirmText;
				$scope.cancelText = cancelText;
			}];
	BaseModalService.confirm = function(options){
		var defaultInputs = {
			confirmText:'ok',
			cancelText: 'cancel',
			modalTitle: 'Confirming'
		};
		var inputs = angular.merge(defaultInputs,options);
		// return the promise
		return ModalService.showModal({
			//load template directly thru webpack
			template: require('../partials/modals/confirm.html'),
			controller: confirmController,
			inputs: inputs
		}).then(function(modal){
			modal.element.modal(); //display
			 // return a promise that resolves the result (true/false)
			return modal.close;
		});
	};
	// for now the same thing as confirm, except title is different
	BaseModalService.alert = function(inputs){
		var defaultInputs = {
			modalTitle:'A Message'
		};

		return BaseModalService.confirm(angular.merge(defaultInputs,inputs)); 
	};
	// accept plain text, OR html to be displayed
	// note that this is dangers
	BaseModalService.errorAlert = function(message){
		var defaultInputs = {
			modalTitle:'A Message',
			modalBody:$sanitize(message)
		};
		return BaseModalService.confirm(defaultInputs); 
	};
	
}])
.name;