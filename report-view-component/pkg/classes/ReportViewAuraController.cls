public class ReportViewAuraController {

	@AuraEnabled
	public static String runReport() {
		Report rep = [SELECT Id, DeveloperName FROM Report WHERE DeveloperName = 'Opportunities_Stage_Report' LIMIT 1];
		Reports.ReportResults results = Reports.ReportManager.runReport(rep.Id, true);
		return JSON.serialize(results);
	}
}
