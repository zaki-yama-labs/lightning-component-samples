public class ExpenseController {
	@AuraEnabled
	public static List<Expense__c> getExpenses() {
		return [SELECT Id, Name, Amount__c, Client__c, Date__c,
			   Reimbursed__c, CreatedDate FROM Expense__c];
	}
}
