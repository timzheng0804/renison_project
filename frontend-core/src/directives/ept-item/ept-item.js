import angular from "angular";
export default angular.module("ept.common.directives.eptItem",[]).directive('eptItem', [function () {
	return {
		priority: 0,
		template: require('./ept-item.html'),
		transclude: true,
		restrict: 'E',
		require:'^eptGroup', //needs eptGroup
		scope: {
		},
		controller: function($scope, $element, $attrs) {},
		link: function postLink(scope, iElement, iAttrs) {

		}
	};
}]).name;