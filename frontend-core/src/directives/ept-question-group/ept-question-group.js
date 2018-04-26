import angular from "angular";
import QuestionType from "../../constants/question-type.js";
import eptQuestion from "../ept-question/ept-question.js";
//import QuestionType from ""; //TODO
/*
	@questions:question[]
	question: see @ept-question
	
	//angular expressions to be passed in, will be given the question obj
	@onQuestionCreated(question) 
	@onQuestionDeleted(question)
	@onQuestionModified(question)
*/
export default angular.module("ept.common.directives.eptQuestionGroup",[eptQuestion]).directive('eptQuestionGroup', [function() {
	//see angular expression, the scope '&' symbol for details
	function makeQuestionCallback(angularExpression) {
		return function(question) {
			if (angularExpression) angularExpression({
				question: question
			});
		}
	}

	function makeNewQuestion(type){
		switch(type){
			case QuestionType.MULTIPLE_CHOICE: //TODO change to QuestionType.MULTIPLE_CHOICE
				return {
					content:"New multiple choice question here...",
					type:type,
					answers:[{
						content:"First new answer here ...",
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
					content:"New true false question here...",
					type:type,
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
					content:"New short answer here ...",
					type:type,
					answers:[{
						content:"First new answer here ...",
						isCorrect:true
					}]
				};
			case QuestionType.FREE_TEXT:
				return {
					content:"New free text here ...",
					type:type
				};
			default:
				throw "cannot make unsupported question type " + type;
		}
	}

	return {
		priority: 0,
		template: require('./ept-question-group.html'),
		// replace: true,
		transclude: true,
		restrict: 'E',
		scope: {
			questions: '=',
			onQuestionCreated: "&",
			onQuestionDeleted: "&",
			onQuestionModified: "&"
		},
		controller: function($scope, $element, $attrs) {



		},
		link: function postLink($scope, iElement, iAttrs) {
			$scope.onQuestionCreatedCallback =
				makeQuestionCallback($scope.onQuestionCreated);
			$scope.onQuestionDeletedCallback =
				makeQuestionCallback($scope.onQuestionDeleted);
			$scope.onQuestionModifiedCallback =
				makeQuestionCallback($scope.onQuestionModified);

			// intended to be called BEFORE question created
			function onQuestionCreate(index,type){
				var newQuestion = makeNewQuestion(type);
				//question created
				$scope.onQuestionCreatedCallback(newQuestion);
				$scope.questions.splice(index+1,0,newQuestion);
			}

			// intended to be called BEFORE question deleted
			$scope.onQuestionDelete = function (question){
				$scope.onQuestionDeletedCallback(question);
				var index = $scope.questions.indexOf(question);
				$scope.questions.splice(index,1);
			};


			$scope.toolbarActions = [{
				iconClass: "fa fa-dot-circle-o",
				text: "Mutiple Choice",
				onAction: function(context) {
					//context in this case is the index of the question to be inserted
					onQuestionCreate(context,QuestionType.MULTIPLE_CHOICE);
				}
			}, {
				iconClass: "fa fa-check",
				text: "True False",
				onAction: function(context) {
					onQuestionCreate(context,QuestionType.TRUE_FALSE);
				}
			}, {
				iconClass: "fa fa-pencil",
				text: "Free Text",
				onAction: function(context) {
					onQuestionCreate(context,QuestionType.FREE_TEXT);
				}
			}, {
				iconClass: "fa fa-square-o",
				text: "Short Answer",
				onAction: function(context) {
					onQuestionCreate(context,QuestionType.SHORT_ANSWER);
				}
			}];

		}
	};
}]).name;