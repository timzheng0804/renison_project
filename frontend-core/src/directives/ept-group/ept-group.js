import angular from "angular";
import eptItem from "../ept-item/ept-item.js";
export default angular.module("ept.common.directives.eptGroup",[eptItem]).directive('eptGroup', [function () {
	return {
		priority: 0,
		template: require('./ept-group.html'),
		transclude: true,
		restrict: 'E',
		scope: {
		},
		controller: function($scope, $element, $attrs) {
		},
		link: function postLink(scope, iElement, iAttrs) {

		}
	};
}]).name;