if (typeof(SiebelAppFacade.CustomPostload) == "undefined") {
	Namespace('SiebelAppFacade.CustomPostload');
	(function () {

		SiebelApp.EventManager.addListner("postload", OnPostload, this);
		SiebelAppFacade.DecisionManager.IsTouch = () => {return false};
		
        function OnPostload() 
        {
			RENCommon.postload();
		}
	}());
}