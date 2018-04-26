import './ept-namecard.less';
import eptActionGroup from '../ept-action-group/ept-action-group.js';
import angular from "angular";
/*

*/



export default angular.module("ept.common.directives.eptNamecard",[eptActionGroup]).directive('eptNamecard', [function () {
    return {
        priority: 0,
        template: require('./ept-namecard.html'),
        restrict: 'E',
        scope: {
            name:'=',//string
            cssClass:'=class', // string
            importantRemark:'=', //string
            actions:'=', // see ept-action-group for actions param
            actionContext:'=', // see ept-action-group for context
            memo: '=', // see ept-namecard.html {{memo}}
            /*
                infoEntries = [infoEntry ...]
                infoEntry = {
                    iconClass: "string",
                    text:"string"
                }

            */
            infoEntries:'=' 

        },
        controller: function($scope, $element, $attrs) {
        },
        link: function postLink($scope, iElement, iAttrs) {
            
        }
    };
}]).name;