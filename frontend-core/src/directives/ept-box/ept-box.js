import './ept-box.less';
import angular from "angular";
import xeditable from "../../lib/xeditable/xeditable.js";
import editableTextAngular from "../editable-text-angular/editable-text-angular.js";
/*
	@actions:optional [action ...]
		action{ 
			class
			iconClass
			text
			onAction: function
		}
	@title: "text"
	@titleEditable: text, optional
		//html for html editing
		//text for text only
	@onUpdateTitle(): angular expression, optional
	@tag: "text" optional

*/



export default angular.module("ept.common.directives.eptBox",[xeditable,editableTextAngular]).directive('eptBox', [function () {
	return {
		priority: 0,
		template: require('./ept-box.html'),
		// replace: true,
		transclude: true,
		restrict: 'E',
		scope: {
			title:'=',
			titleEditable:"=?",
			onUpdateTitle:"&",
			actions:'=',
			cssClass:"=class",
			tag:'='
		},
		controller: function($scope, $element, $attrs) {
			$scope.data={};
			$scope.data.title=$scope.title; //need to add title to data.title
			// so that text editable keeps our title in sync
			function onUpdateTitleCallback(){
				$scope.onUpdateTitle({
					title:$scope.data.title
				});
			};
			//deep watch data, so that we get notified when title changes
			$scope.$watch("data", $scope.onUpdateTitle, true);
			$scope.$watch("title",function(){
				$scope.data.title = $scope.title; //achieve two way binding
			},true);
		},
		link: function postLink($scope, iElement, iAttrs) {
			
		}
	};
}]).name;