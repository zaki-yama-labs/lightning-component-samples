({
	doInit : function(cmp, ev) {
		cmp.set('v.Message', 'Retrieving user details');
		var action = cmp.get("c.GetUserDetails");

		var self = this;
		action.setCallback(this, function(response) {
			self.actionResponseHandler(response, cmp, self, self.gotUserDetails, 'Retrieved User Details');
		});
		$A.enqueueAction(action);
	},
	gotUserDetails : function(cmp, helper, result, msg) {
		cmp.set('v.UserDetails', result);
		cmp.set('v.Message', msg);
	},
	updateCheckbox : function(cmp, ev) {
		var value=ev.getSource().get('v.value');
		var userId=ev.getSource().getElement().parentElement.id;
		var userDetails=cmp.get('v.UserDetails');

		for (var idx=0; idx<userDetails.length; idx++) {
			if (userDetails[idx].user.Id==userId) {
				userDetails[idx].userLogin.IsFrozen=!value;
			}
		}
		cmp.set('v.UserDetails', userDetails);
	},
	applyChanges : function(cmp, helper) {
		cmp.set('v.Message', 'Applying Changes');
		var action = cmp.get("c.UpdateUserDetails");
		var userDetails=cmp.get('v.UserDetails');
		var udAsJSON=JSON.stringify(userDetails);
		var params={
			"toProcessAsJSON" : udAsJSON
		};

		console.log('Params = ' + JSON.stringify(params));
		action.setParams(params);

		var self = this;
		action.setCallback(this, function(response) {
			self.actionResponseHandler(response, cmp, self, self.gotUserDetails, 'Changes Applied');
		});
		$A.enqueueAction(action);
	},
	actionResponseHandler : function (response, component, helper, cb, cbData) {
		try
		{
			var state = response.getState();
			console.log('State = ' + state);
			if (state === "SUCCESS") {
				var retVal=response.getReturnValue();
				console.log('Result = ' + JSON.stringify(retVal));
				cb(component, helper, retVal, cbData);
				console.log('Done with callback');
			}
			else if (state === "ERROR") {
				var errors = response.getError();
				if (errors) {
					console.log("Errors", errors);
					if (errors[0] && errors[0].message) {
						alert("Error message: " + errors[0].message);
					}
				}
				else {
					alert("Unknown error");
				}
			}
		}
		catch (e) {
			alert('Exception in actionResponseHandler: ' + e);
		}
	}
})
