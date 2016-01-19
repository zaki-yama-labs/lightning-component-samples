({
	getExpenses: function(component) {
		var action = component.get('c.getExpenses');
		var self = this;
		action.setCallback(this, function(a) {
			component.set('v.expenses', a.getReturnValue());
			self.updateTotal(component);
		});
		$A.enqueueAction(action);
	},
	updateTotal: function(component) {
		var expenses = component.get('v.expenses');
		var total = 0;
		for (var i = 0; i < expenses.length; i++) {
			var e = expenses[i];
			total += e.yama1__Amount__c;
		}
		component.set('v.total', total);
		component.set('v.exp', expenses.length);
	},
})
