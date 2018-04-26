import QuestionType from "../../constants/question-type.js";
import ComponentType from "../../constants/component-type.js";

export default function BasicTestController($scope,$timeout){
	$scope.title="Hello";
	$scope.testHtml = "<div style='background-color:yellow'> Hello! </div>";
	$scope.actions=[{
		class:"",
		iconClass:"fa fa-trash",
		onAction:function(){
			console.log("trash action")
		}
	}];
	$scope.testActions = [{
		class:"",
		iconClass:"fa fa-trash",
		onAction:function(){
			console.log("trash action")
		}
	},{
		class:"",
		iconClass:"fa fa-eye",
		onAction:function(){
			console.log("eye action")
		}
	},{
		class:"",
		iconClass:"fa fa-floppy-o",
		onAction:function(){
			console.log("save action")
		}
	}];
	$scope.testEditActions = [{
		class:"",
		iconClass:"fa fa-trash",
		onAction:function(){
			console.log("trash action")
		}
	},{
		class:"",
		iconClass:"fa fa-pencil",
		onAction:function(){
			console.log("pencil action")
		}
	},{
		class:"",
		iconClass:"fa fa-copy",
		onAction:function(){
			console.log("copy action")
		}
	}];
	$scope.category = {
		name:"hello category",
		timeAllowed:35
	}
	$scope.categoryActions = [{
		class:"",
		iconClass:"fa fa-trash",
		onAction:function(){
			console.log("trash action")
		}
	},{
		class:"",
		iconClass:"fa fa-clock-o",
		onAction:function(){
			console.log("clock action")
		},
		text:"30min"
	},{
		class:"",
		iconClass:"fa fa-chevron-down",
		onAction:function(){
			console.log("clock action")
		}
	}]
	$scope.questionTypeActions=[{
		iconClass:"fa fa-dot-circle-o",
		text:"Mutiple Choice",
		onAction:function(context){
			console.log("context is " + context);
		}
	},{
		iconClass:"fa fa-check",
		text:"True False",
		onAction:function(context){
			console.log("context is " + context);
		}
	},{
		iconClass:"fa fa-pencil",
		text:"Free Text",
		onAction:function(context){
			console.log("context is " + context);
		}
	},{
		iconClass:"fa fa-square-o",
		text:"True False",
		onAction:function(context){
			console.log("context is " + context);
		}
	}];

	$scope.logFunc = function(arg1,arg2,arg3){
		console.log("arg1: ", arg1);
		console.log("arg2: ", arg2);
		console.log("arg3: ", arg3);
	};

	$scope.onResChanged = function(lol){
		console.log(lol);
	};
	$scope.onQnsChanged = function(question){
		console.log(question);
	};
	$scope.deleteQuestion = function(question){
		var index = $scope.questions.indexOf(question);
		$scope.questions.splice(index,1);
	};
	$scope.answers = [{
		content:"hello",
	},{
		content:"world!"
	}];

	$scope.questions = [{
		content:"Please answer this question",
		order:1,
		answers:[{
			content:"Choice 1",
			isCorrect:false

		},{
			content:"Choice 2",
			isCorrect:false

		},{
			content:"Choice 3",
			isCorrect:false

		}],
		type:QuestionType.MULTIPLE_CHOICE,
		response:"Choice 1"
	},{
		content:"Please answer this question, short answer Please answer this question, short answerPlease answer this question, short answerPlease answer this question, short answerPlease answer this question, short answerPlease answer this question, short answerPlease answer this question, short answer",
		// answers:[],
		order:2,
		type:QuestionType.SHORT_ANSWER
	},{
		content:"Please answer this question, true false",
		order:3,
		type:QuestionType.TRUE_FALSE,
		answers:[{
			content:"true",
		},{
			content:"false"
		}]
	},{
		order:4,
		content:"Please answer this question, free text",
		type:QuestionType.FREE_TEXT
	}];
	$scope.testComponents = $scope.questions.concat([{
		type:ComponentType.COMP_HTML,
		order:5,
		content:"Hi there, edit me"
	},{
		type:ComponentType.COMP_HTML,
		order:6,

		content:"I am another paragraph type"
	}]);

	$scope.tests = [{
		name:"Beijing Jiao Da Test",
		reportTime:"2016-09-10",
		updateTimeStamp:"2016-09-11",
		comment:"Most students finish on time"
	},{
		name:"Beijing University Test",
		reportTime:"2016-05-24",
		updateTimeStamp:"2016-04-18",
		comment:"Some cannot understand listening question 2"
	},{
		name:"Beijing Jiao Da Test",
		reportTime:"2016-11-02",
		updateTimeStamp:"2016-11-06",
		comment:""
	}];
};


BasicTestController.$inject  = ['$scope','$timeout'];