const RENCommon = {

	postload : function () 
	{
		var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");
		var view = SiebelApp.S_App.GetActiveView();
		var homeAttr = "introHome";
		var accAttr = "introAccount";
		var pm;
		var inputPS;
		var controls;
		
		if (view.GetName() == "CIF Home Page View") {
			pm = view.GetAppletMap()["FINS Home Households List Applet"].GetPModel();

			if (pm.Get(homeAttr) != "true") {
				controls = pm.Get("GetControls");
				var myHH = controls["AppletTitle"].GetInputName();

				$("[name='"+myHH+"']").attr("data-step", "1");
				$("[name='"+myHH+"']").attr("data-intro", "Появилась новая кнопка");
				
				$('.siebui-salutation-text b').attr("data-step", "2");
				$('.siebui-salutation-text b').attr("data-intro", "Поменялся текст приветствия");
				
				inputPS = CCFMiscUtil_CreatePropSet();
				inputPS.SetProperty("Key", homeAttr);
				inputPS.SetProperty(homeAttr, "true");
				pm.OnControlEvent(siebConsts.get("PHYEVENT_INVOKE_CONTROL"), pm.Get(siebConsts.get("SWE_MTHD_UPDATE_USER_PREF")), inputPS);
				pm.SetProperty(homeAttr, "true");

				introJs().start();
			}
		}
		if (view.GetName() == "Account Screen Homepage View") {
			pm = view.GetAppletMap()["Account Home Add Virtual Form Applet"].GetPModel();
			
			if (pm.Get(accAttr) != "true") {
				controls = pm.Get("GetControls");
				var appId = view.GetAppletMap()["Account Home Add Virtual Form Applet"].GetFullId();
				var acc = controls["Name"].GetInputName();
				var loc = controls["Location"].GetInputName();
				var butt = controls["MirrorAddGotoView"].GetInputName();

				$("#"+appId).attr("data-step", "1");
				$("#"+appId).attr("data-intro", "Появился новый раздел: добавляет Организацию");
				$("[name='"+acc+"']").attr("data-step", "2");
				$("[name='"+acc+"']").attr("data-intro", "Здесь пишем Наименование");
				$("[name='"+loc+"']").attr("data-step", "3");
				$("[name='"+loc+"']").attr("data-intro", "А здесь Расположение");
				$("[name='"+butt+"']").attr("data-step", "4");
				$("[name='"+butt+"']").attr("data-intro", "Нажимаем кнопку и сразу переходим в созданную организацию");

				inputPS = CCFMiscUtil_CreatePropSet();
				inputPS.SetProperty("Key", accAttr);
				inputPS.SetProperty(accAttr, "true");
				pm.OnControlEvent(siebConsts.get("PHYEVENT_INVOKE_CONTROL"), pm.Get(siebConsts.get("SWE_MTHD_UPDATE_USER_PREF")), inputPS);
				pm.SetProperty(accAttr, "true");

				introJs().start();
			}
		}
	}
}