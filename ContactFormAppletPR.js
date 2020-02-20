if (typeof(SiebelAppFacade.ContactFormAppletPR) === "undefined")
{
    SiebelJS.Namespace("SiebelAppFacade.ContactFormAppletPR");
    define("siebel/custom/ContactFormAppletPR", ["siebel/phyrenderer"], function()
    {
        SiebelAppFacade.ContactFormAppletPR = (function()
        {

            function ContactFormAppletPR(pm)
            {
                SiebelAppFacade.ContactFormAppletPR.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(ContactFormAppletPR, SiebelAppFacade.PhysicalRenderer);

            ContactFormAppletPR.prototype.Init = function()
            {
                SiebelAppFacade.ContactFormAppletPR.superclass.Init.apply(this, arguments);
				this.AttachPMBinding("CustValue",this.ShowStars)
            }

            ContactFormAppletPR.prototype.ShowUI = function()
            {
				console.log(">>> ShowUI");
                SiebelAppFacade.ContactFormAppletPR.superclass.ShowUI.apply(this, arguments);
				// create placeholder
				var pm = this.GetPM();
				var controls = pm.Get("GetControls");
				var htmlName;
				for (controlKey in controls) {
				    if (controls[controlKey].GetFieldName() == "Customer Value Indicator") {
						var CustomerControl = controls[controlKey];
						htmlName = CustomerControl.GetInputName();
						$("[name='" + htmlName + "']").after("<div id='my_value'></div>");
					}
				}
				// hide vanilla indicator
				$("[name='" + htmlName + "']").remove();
				$("#Customer_Value_Indicator_Label").removeClass("siebui-responsive-label");
				$("#Customer_Value_Indicator_Label").text("Яйца дрозда:");
            }

            ContactFormAppletPR.prototype.BindData = function(bRefresh)
            {
                console.log(">>> BindData");
				SiebelAppFacade.ContactFormAppletPR.superclass.BindData.apply(this, arguments);
            }

            ContactFormAppletPR.prototype.BindEvents = function()
            {
                console.log(">>> BindEvents");
				SiebelAppFacade.ContactFormAppletPR.superclass.BindEvents.apply(this, arguments);
            }

            ContactFormAppletPR.prototype.EndLife = function()
            {
                SiebelAppFacade.ContactFormAppletPR.superclass.EndLife.apply(this, arguments);
            }
			
			ContactFormAppletPR.prototype.ShowStars = function() {
				var pm = this.GetPM();
				var controls = pm.Get("GetControls");
				for (controlKey in controls) {
				    if (controls[controlKey].GetFieldName() == "Customer Value Indicator") {
						var CustomerControl = controls[controlKey];
						var htmlName = CustomerControl.GetInputName();
						var value = pm.Get("CustValue");
						$("[name='CustValue']").detach();
						if (value == 0) {
							$("#my_value").after("<div name='CustValue' >Дрозд без яиц</div>");
						}
						else for (var i=1; i<=value; i++){
							$("#my_value").after('<img name="CustValue" style="right:0; bottom:0;width:15px; height:15px;" src="http://localhost/images/icon_sitemap_1.gif"; />');
						}
					}
				}
			}

            return ContactFormAppletPR;
        }());
        return "SiebelAppFacade.ContactFormAppletPR";
    })
}