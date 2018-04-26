import angular from "angular";
import "./ept-tool-bar.less";
/*
	@actions:optional [action ...]
		action{ 
			class
			iconClass
			text
			onAction: function
		}
	@context: Any, argument to onAction function in each action object
	@cssClass: string optional, additional css to be added on this directive
*/
export default angular.module("ept.common.directives.eptToolbar",[]).directive('eptToolbar', [function () {
	return {
		priority: 0,
		template: require('./ept-tool-bar.html'),
		transclude: true,
		restrict: 'E',
		scope: {
			context:'=',
			actions:'=',
			cssClass:"=class",

		},
		controller: function($scope, $element, $attrs) {

		},
		link: function postLink(scope, iElement, iAttrs) {
			
		}
	};
}]).name;