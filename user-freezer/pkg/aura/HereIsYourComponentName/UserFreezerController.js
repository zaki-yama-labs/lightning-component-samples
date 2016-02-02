({
	doInit : function(component, event, helper) {
		helper.doInit(component, event);
	},
	frozenChanged: function(component, event, helper) {
		helper.updateCheckbox(component, event);
	},
	applyChanges : function(component, event, helper) {
		helper.applyChanges(component, helper);
	}
})
