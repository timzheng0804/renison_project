import angular from "angular";
import eptBox from "../ept-box/ept-box.js";
import "./ept-question.less";
import QuestionType from "../../constants/question-type.js";
import _ from "lodash";
/*
	interface question{
		id: num
		content: string
		type: string
		answers: optional answers[], required only for multiple choice, and true false
		response: optional string
		isSaved: optional boolean
	}

	isAdmin: boolean , flags if directive is for admin to create question
	onResponseChanged: optional function callback with argument `question`
	onQuestionChanged: optional function callback with argument `question`
	onQuestionDeleted: optional function
	questionNum: required number indicating which question it is on a test
	highlightCorrect: if the correct answer is attached, we can highlight it 
	answer{
		id: num

	}
*/
export default angular.module("ept.common.directives.eptQuestion",[]).directive('eptQuestion', [function() {
		var DEFAULT_CLASS = " ept-question"; //needs a space in front for css
		//implements action interface of ept-box
		var NOT_SAVED = {
			"iconClass": "fa fa-floppy-o not-saved"
		};
		var SAVED = {
			"iconClass": "fa fa-floppy-o saved"
		};
		var DELETE = {
			"iconClass": "fa fa-trash",
			"tooltip": "delete"
		};

		return {
			priority: 0,
			template: require('./ept-question.html'),
			// transclude: true,
			restrict: 'E',
			scope: {
				"question": '=',
				"onResponseChanged": '&',
				"onQuestionChanged":'&',
				"questionNum": '=',
				"isAdmin": '=',
				"onQuestionDeleted": '&',
				"highlightCorrect":'='
			},
			controller: function($scope, $element, $attrs) {
				var question = $scope.question; //for convenience 

				function commonInit() {
					$scope.cssClass = DEFAULT_CLASS;
					$scope.actions = [];

					//assume it is a string, concatenate class
					if (question["class"]) {
						$scope.cssClass += question["class"];
					}
					

				}


				/*===============================================
				=            AdminSide initalization            =
				===============================================*/
				
				
				
				//called only for admin side
				// add actions such as delete to question
				function adminInit() {
					$scope.cssClass += " ept-question-make";

					//if question is passed in without answers, add some
					function makeDefaultAnswers(answers) {
						if (!question.answers || question.answers.length == 0) {
							question.answers = [];
							_.forEach(answers,function(v){
								question.answers.push({
									content:v,
									isCorrect:false
								});
							});
							$scope.question.answers[0].isCorrect = true; //at least one of them must
							// be correct, defaults to the first one
						}
					}
					//initialize some default answers if there are none
					switch ($scope.question.componentType) {
						case QuestionType.MULTIPLE_CHOICE:
							makeDefaultAnswers(["new choice"]);
							break;
						case QuestionType.SHORT_ANSWER:
							makeDefaultAnswers(["new answer"]);
							break;
						case QuestionType.TRUE_FALSE:
							makeDefaultAnswers(["true","false"]);
							break;
						default:
							break;
					}

					//make default new answer
					$scope.newAnswer = function() {
						var defaultAnswer = {
							content: "new answer",
							isCorrect: $scope.question.componentType == QuestionType.SHORT_ANSWER 
							// if it is short answer, then true by default
						};
						$scope.question.answers.push(defaultAnswer);
					};
					$scope.deleteAnswer = function(index){
						$scope.question.answers.splice(index,1);
					};
					// called when the correct answer gets changed
					// only for multple choice and true false for now
					$scope.onCorrectAnswerChanged = function(answerIndex) {
						switch($scope.question.componentType){
							case QuestionType.MULTIPLE_CHOICE:
							case QuestionType.TRUE_FALSE:
								_.forEach($scope.question.answers, function(v, i) {
									if (i != answerIndex) {
										v.isCorrect = false;
									} else {
										v.isCorrect = true;
									}
								});
								break;
							default:
								break;
						}
						onQuestionChangedCallback();
					};

					function onQuestionChangedCallback(){
						$scope.onQuestionChanged({
							question:$scope.question
						});
					}
					//notify when question is changed
					//why an object instead of just $scope.question?
					// search angular directive pass in function
					$scope.$watch("question",function(){onQuestionChangedCallback();},true); //enable deep watch
					//title passed to ept-box is our question content
					$scope.updateContent = function(questionContent){
						question.content = questionContent;
						// in the next cycle, our watch("question") handler
						// will be called
					}

					//actions on the upper left corner
					$scope.actions = [];
					var deleteAction = {};
					angular.extend(deleteAction, DELETE); //so that deleteAction
					// has the right icon
					// assign an onAction callback
					deleteAction["onAction"] = function() {
						$scope.onQuestionDeleted({
							question: $scope.question
						});
					};
					$scope.actions.push(deleteAction);
				}

				/*=======================================================
				=            Initialization for student side            =
				=======================================================*/
				
				
				
				function studentInit() {
					if (!question["response"]) {
						question["response"] = [{
							text:""
						}]; //initialize response key
					}

					function onSaveChanged() {
						$scope.actions = [];
						var savedIndicator = NOT_SAVED; //indicates saving status

						//you should use $scope.question, not question!! this is 
						// a new closure
						if ($scope.question["isSaved"]) {
							savedIndicator = SAVED;
						} else {
							savedIndicator = NOT_SAVED;
						}
						$scope.actions.push(savedIndicator);
					}

					$scope.$watch('question', onSaveChanged, true);
					$scope.onResChangedCallback = function() {
						$scope.onResponseChanged({
							question: $scope.question
						});
					};
				}


				/*==============================================
				=            Calling initialization            =
				==============================================*/
				
				commonInit();
				if ($scope.isAdmin) {
					adminInit();
				} else {
					studentInit();
				}


			},
			link: function postLink($scope, iElement, iAttrs) {



			}
		};
	}]).name;