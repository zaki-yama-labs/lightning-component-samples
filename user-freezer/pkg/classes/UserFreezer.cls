/** *****************************************************************************
* User Freezer
*
* Description: 
*
* Apex controller for the Freeze Users Lightning Component.
*
* If you are the sort of person who likes reading code, BrightGen is the place
* for you - check out http://www.brightgen.com to see our latest vacancies.
*
* Author kbowden
* Date 31 Jan 2016
********************************************************************************/
public class UserFreezer {
	@AuraEnabled
	public static List<UserDetails> GetUserDetails() {
		List<UserDetails> results=new List<UserDetails>();
		Map<Id, UserLogin> ulByUid=new Map<Id, UserLogin>();
		for (UserLogin ul : [select id, IsFrozen, IsPasswordLocked, UserId 
				from UserLogin]) {
			ulByUid.put(ul.UserId, ul);
		}

		for (User us : [select id, FirstName, LastName, Username
				from User
				where IsActive=true
				and id in :ulByUid.keySet()
				order by CreatedDate
				limit 5]) {
			UserDetails ud=new UserDetails();
			ud.user=us;
			ud.userLogin=ulByUid.get(us.id);

			results.add(ud);
		}

		return results;
	}

	@AuraEnabled
	public static List<UserDetails> UpdateUserDetails(String toProcessAsJSON) {
		System.debug('In UpdateUserDetails, toProcess = ' + toProcessAsJSON);

		Type udArrType=Type.forName('List<UserFreezer.UserDetails>');
		List<UserDetails> toProcess = (List<UserDetails>)JSON.deserialize(toProcessAsJSON, udArrType);

		List<UserLogin> toUpdate=new List<UserLogin>();
		for (UserDetails ud : toProcess) {
			toUpdate.add(ud.UserLogin);
		}

		System.debug('About to update ' + toUpdate);

		update toUpdate;

		return GetUserDetails();
	}

	public class UserDetails {
		@AuraEnabled
		public UserLogin userLogin {get; set;}

		@AuraEnabled
		public User user {get; set;}
	}
}
