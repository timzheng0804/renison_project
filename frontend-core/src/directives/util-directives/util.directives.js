import angular from 'angular';

export default angular.module('ept-util-directives',[])
	.directive('stopEvent', function () {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attr) {
	            element.bind('click', function (e) {
	                e.stopPropagation();
	            });
	        }
	    };
	 })
	.name;
