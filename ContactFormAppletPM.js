if (typeof(SiebelAppFacade.ContactFormAppletPM) === "undefined")
{
    SiebelJS.Namespace("SiebelAppFacade.ContactFormAppletPM");
    define("siebel/custom/ContactFormAppletPM", ["siebel/pmodel"], function()
    {
        SiebelAppFacade.ContactFormAppletPM = (function()
        {

            function ContactFormAppletPM(pm)
            {
                SiebelAppFacade.ContactFormAppletPM.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(ContactFormAppletPM, SiebelAppFacade.PresentationModel);

            ContactFormAppletPM.prototype.Init = function()
            {
                SiebelAppFacade.ContactFormAppletPM.superclass.Init.apply(this, arguments);
				this.AddMethod("FieldChange",this.OnFieldChange,
					{sequence:false, scope:this});
				this.AddMethod("ShowSelection",this.OnSelectionChange,
					{sequence:false, scope:this});
				this.AddProperty("CustValue", 0);
            }

            ContactFormAppletPM.prototype.OnFieldChange = function(control, value)
            {
                if (control.GetFieldName() == "Customer Value Indicator") {
					this.SetProperty("CustValue", value);
				}
            }

            ContactFormAppletPM.prototype.OnSelectionChange = function()
            {
				console.log(">>> PM: SelectionChange");
				var controls = this.Get( "GetControls" );
				var value;
				for (controlKey in controls) {
					if (controls[controlKey].GetFieldName() == "Customer Value Indicator") {
						value = this.ExecuteMethod("GetFieldValue",controls[controlKey]);
						this.SetProperty("CustValue", value);
					}
				}
            }

            ContactFormAppletPM.prototype.Setup = function(propSet)
            {
                SiebelAppFacade.ContactFormAppletPM.superclass.Setup.apply(this, arguments);
            }

            return ContactFormAppletPM;
        }());
        return "SiebelAppFacade.ContactFormAppletPM";
    })
}