import angular from "angular";
import ComponentType from "../../constants/component-type"
import "./ept-test-component.less";
/*
	Union between `ept-question` and `ept-test-html`
	interface component{
		type: string, indicates if it is a question or html
			currently, all types are either 'html', or question types 
			such as 'Short_Anwer',
		... //more properties according to type e.g. answers if it is question
	}

*/

export default angular.module("ept.common.directives.'eptTestComponent'",[])
.directive('eptTestComponent', ['$rootScope',function ($rootScope) {
	return {
		priority: 0,
		template: require('./ept-test-component.html'),
		restrict: 'E',
		scope: {
			component:'=',
			onComponentChanged:'&', //expression called with `component` arg
			onComponentDeleted:'&', //same as ^
			onResponseChanged:'&', //for question-only, see ept-question
			componentNum:'=', //required if question
			isAdmin:'=', //whether components should be editable
			isLoading:'&', // one way binding 
			highlightCorrect:'=' // see ept-question
		},
		controller: function($scope, $element, $attrs) {

		},
		link: function postLink($scope, iElement, iAttrs) {
			$scope.$on('fileChanged',function($event,data){
				$event.stopPropagation();
				data.component = $scope.component;
				$rootScope.$broadcast('videoFileChanged',data);
			});
			$scope.isHtml = function(){
				return $scope.component.componentType === ComponentType.COMP_HTML;
			};
			$scope.isVideo = function(){
				return $scope.component.componentType === ComponentType.COMP_VIDEO;
			};
			$scope.isQuestion = function(){
				return !($scope.isHtml() || $scope.isVideo());
			};
			$scope.onComponentDeletedCallback = function(){
				if($scope.onComponentDeleted)$scope.onComponentDeleted({
					component:$scope.component
				});
			};
			// hack! do not initiate callback if only ordering changed
			$scope.$watch("component",function(newval,oldval){
				if($scope.onComponentChanged 
					&& !angular.equals(newval,oldval))
				{
					$scope.onComponentChanged({
						component:$scope.component,
						oldComponent:oldval
					});
				}
			},true);
			$scope.onResponseChangedCallback = function(){
				if($scope.onResponseChanged)$scope.onResponseChanged({
					component:$scope.component
				});
			};
		}
	};
}]).name;