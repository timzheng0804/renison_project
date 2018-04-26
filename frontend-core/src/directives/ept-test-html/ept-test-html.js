import "./ept-test-html.less";
import editableTextAngular from "../editable-text-angular/editable-text-angular.js";
/*
	content:string any html content
	editable: whether this component is editable
*/
export default angular.module("ept.common.directives.eptTestHtml",[editableTextAngular])
	.directive('eptTestHtml', [function() {
		return {
			template: require('./ept-test-html.html'),
			// transclude: true,
			restrict: 'E',
			scope: {
				content: '=',
				editable:'=',
				onContentDeleted:'&'
			},
			controller: function($scope, $element, $attrs) {

			},
			link: function postLink($scope, iElement, iAttrs) {
				$scope.onContentDeletedCallback = function(){
					$scope.onContentDeleted();
				};
				$scope.cssClass={
					"ept-editable":$scope.editable
				};
			}
		};
	}]).name;