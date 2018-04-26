import './ept-test-video.less';
import 'ng-file-upload';
export default angular.module("ept.common.directives.eptTestVideo",['ngFileUpload','ngSanitize'])
	.directive('eptTestVideo', ['$sce',function($sce) {
		return {
			template: require('./ept-test-video.html'),
			// transclude: true,
			restrict: 'E',
			scope: {
				content: '=',
				uploadable:'=',
				onContentDeleted:'&'
			},
			controller: function($scope, $element, $attrs) {
				$scope.asTrustedUrl = function(url){
					return $sce.trustAsResourceUrl(url);
				}
				$scope.changeFile = function(file){
					$scope.$emit('fileChanged',{
						file:file
					});
				};
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