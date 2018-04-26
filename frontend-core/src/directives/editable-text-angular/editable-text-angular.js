import angular from "angular";
import textAngular from "../../lib/textAngularLib";// TODO 
// import "textAngular/dist/textAngular-sanitize.js";// TODO 

export default angular.module("ept.common.directives.editableTextAngular",[textAngular])

.config(['$provide', function($provide){
        // this demonstrates how to register a new tool and add it to the default toolbar
        $provide.decorator('taOptions', ['$delegate', function(taOptions){
            // $delegate is the taOptions we are decorating
            // here we override the default toolbars and classes specified in taOptions.
            // taOptions.forceTextAngularSanitize = true; // set false to allow the textAngular-sanitize provider to be replaced
            // taOptions.keyMappings = []; // allow customizable keyMappings for specialized key boards or languages
            taOptions.toolbar = [
			      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
			      ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
			      ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
                  ['insertImage']
			      // ['html', 'insertImage','insertLink', 'insertVideo', 'wordcount', 'charcount']
			  ];
            return taOptions; // whatever you return will be the taOptions
        }])
    }])
.directive('editableTextAngular', [function () {
	return {
		priority: 1,
		template:require('./editable-text-angular.html'),
		restrict: 'E',
		scope: {
			"content":"=", //content to be edited by text angular
			"nonEditable":'=?'
		},
		controller: function($scope, $element, $attrs,$document) {
			$scope.isShown = false;
			$scope.toggleShown = function(){
				if($scope.nonEditable) return; //do nothing if not editable
				if(!$scope.isShown){
					$scope.isShown=true;
					$element.on("mousedown",function(event){
						event.stopPropagation();
					});
					$document.on("mousedown",function(e){
						e.preventDefault();
						e.stopPropagation();
						$scope.isShown = false;

						$document.off("mousedown");
						$scope.$digest();
					});
				}
			};
            if(!$scope.content){
                $scope.content = 'Enter description by double clicking';
            }
		},
		link: function postLink(scope, elem, iAttrs) {

		}
	};
}]).name;
