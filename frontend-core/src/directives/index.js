'use strict'
import angular from "angular";
import eptActionGroup from "./ept-action-group/ept-action-group.js";
import eptBox from "./ept-box/ept-box.js";
import eptNamecard from "./ept-namecard/ept-namecard.js";
import eptCategory from "./ept-category/ept-category.js";
import eptGroup from "./ept-group/ept-group.js";
import eptQuestion from "./ept-question/ept-question.js";
import eptQuestionGroup from "./ept-question-group/ept-question-group.js";
import eptTestComponent from "./ept-test-component/ept-test-component.js";
import eptTestComponentGroup from "./ept-test-component-group/ept-test-component-group.js";
import eptTestHtml from "./ept-test-html/ept-test-html.js";
import eptTestVideo from "./ept-test-video/ept-test-video.js";
import eptToolBar from "./ept-tool-bar/ept-tool-bar.js";
import eptLoadingBar from "./ept-loading-bar/ept-loading-bar.js";
import utilDirectives from "./util-directives/util.directives.js";
import "./common.less";
export default angular.module("ept.common.directives", [eptActionGroup, 
	eptBox, eptCategory, eptGroup, eptQuestion, 
	eptQuestionGroup, eptTestComponent, 
	eptTestComponentGroup, eptTestHtml, 
    eptTestVideo,
	eptToolBar,eptLoadingBar,utilDirectives,
    eptNamecard])

.name;