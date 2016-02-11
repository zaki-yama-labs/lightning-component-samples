public class AccountsController {
   @AuraEnabled
   public static List<Account> getAccounts() {
       return [SELECT Id, name, industry, Type, NumberOfEmployees, TickerSymbol, Phone, BillingStreet, BillingCity, BillingState, BillingPostalCode 
       FROM Account ORDER BY createdDate ASC];
   }   
}