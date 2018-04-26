var ComponentType = {
	COMP_HTML:'HTML',
    COMP_VIDEO: 'VIDEO',
    isQuestionType: function(type){
        return !(type===ComponentType.COMP_HTML ||
         type===ComponentType.COMP_VIDEO);
    }
};

export default ComponentType;