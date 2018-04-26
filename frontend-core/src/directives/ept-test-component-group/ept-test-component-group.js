import angular from "angular";
import QuestionType from "../../constants/question-type.js";
import ComponentType from "../../constants/component-type.js";
import eptTestComponent from "../ept-test-component/ept-test-component.js";
/*
	@components:component[]
	component: see @ept-test-component
	
	//angular expressions to be passed in, will be given the Component obj
	@onComponentCreated(Component) 
	@onComponentDeleted(Component)
	@onComonentChanged(Component)
*/
export default angular.module("ept.common.directives.eptTestComponentGroup",[eptTestComponent]).directive('eptTestComponentGroup', [function() {
	//see angular expression, the scope '&' symbol for details
	function makeComponentCallback(angularExpression) {
		return function(component,oldComponent) {
			if (angularExpression) angularExpression({
				component: component,
				oldComponent: oldComponent
			});
		}
	}

	function makeNewComponent(componentType){
		switch(componentType){
			case QuestionType.MULTIPLE_CHOICE:
				return {
					content:"New multiple choice question here...",
					componentType:componentType,
					answers:[{
						content:"First new answer, I am selected thus the correct answer",
						isCorrect:true
					},{
						content:"Second new answer here ...",
						isCorrect:false
					},{
						content:"Third new answer here ...",
						isCorrect:false
					},{
						content:"Fourth new answer here ...",
						isCorrect:false
					}]
				};
			case QuestionType.TRUE_FALSE:
				return {
					content:"New true false question here... true is by default correct",
					componentType:componentType,
					answers:[{
						content:"true",
						isCorrect:true
					},{
						content:"false",
						isCorrect:false
					}]
				};
			case QuestionType.SHORT_ANSWER:
				return {
					content:"New short answer here ... ",
					componentType:componentType,
					answers:[{
						content:"First new answer here ...",
						isCorrect:true
					}]
				};
			case QuestionType.FREE_TEXT:
				return {
					content:"New free text here ... no answer needed",
					componentType:componentType
				};
			case ComponentType.COMP_HTML:
				return{
					content:"<h1>You can edit me! in WYSIWYG style!</h1>",
					componentType:componentType
				};
			case ComponentType.COMP_VIDEO:
				return{
					content:"",
					componentType:componentType
				};
			default:
				throw "cannot make unsupported question type " + componentType;
		}
	}

	return {
		priority: 0,
		template: require('./ept-test-component-group.html'),
		restrict: 'E',
		scope: {
			components: '=',
			onComponentCreated: "&",
			onComponentDeleted: "&",
			onComponentChanged: "&"
		},
		controller: function($scope, $element, $attrs) {
		},
		link: function postLink($scope, iElement, iAttrs) {
			$scope.onComponentCreatedCallback =
				makeComponentCallback($scope.onComponentCreated);
			$scope.onComponentDeletedCallback =
				makeComponentCallback($scope.onComponentDeleted);
			$scope.onComponentChangedCallback =
				makeComponentCallback($scope.onComponentChanged);

			// intended to be called BEFORE component created
			function onComponentCreate(index,type){
				var newComponent = makeNewComponent(type);
				newComponent.ordering = index; //set ordering
				//Component created
				$scope.onComponentCreatedCallback(newComponent);
				//insert component at that index
				$scope.components.splice(index,0,newComponent);
				// make sure that `ordering` property is preserved
				for(var i=index+1;i<$scope.components.length;i++){
					$scope.components[i].ordering++;
				}
			}

			// intended to be called BEFORE component deleted
			$scope.onComponentDelete = function (component){
				$scope.onComponentDeletedCallback(component);
				var index = $scope.components.indexOf(component);
				$scope.components.splice(index,1);
			};


			$scope.toolbarActions = [{
				iconClass: "fa fa-dot-circle-o",
				text: "Mutiple Choice",
				onAction: function(context) {
					//context in this case is the index of the question to be inserted
					onComponentCreate(context,QuestionType.MULTIPLE_CHOICE);
				}
			}, {
				iconClass: "fa fa-check",
				text: "True False",
				onAction: function(context) {
					onComponentCreate(context,QuestionType.TRUE_FALSE);
				}
			}, 
			// {
			// 	iconClass: "fa fa-pencil",
			// 	text: "Free Text",
			// 	onAction: function(context) {
			// 		onComponentCreate(context,QuestionType.FREE_TEXT);
			// 	}
			// }, 
			{
				iconClass: "fa fa-square-o",
				text: "Short Answer",
				onAction: function(context) {
					onComponentCreate(context,QuestionType.SHORT_ANSWER);
				}
			},{
				iconClass:"fa fa-file-o",
				text:"Paragraph",
				onAction:function(context){
					onComponentCreate(context,ComponentType.COMP_HTML);
				}
			},{
				iconClass:"fa fa-youtube-play",
				text:"Video",
				onAction:function(context){
					onComponentCreate(context,ComponentType.COMP_VIDEO);
				}
			}];
		}
	};
}]).name;