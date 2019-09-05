public with sharing class StagesController {
    @AuraEnabled
    public static List<String> getStages() {
        List<String> stages = new List<String>();
        Schema.DescribeFieldResult fldResult = Opportunity.stagename.getDescribe();
        List<Schema.PicklistEntry> stagePl = fldResult.getPicklistValues();
        for (Schema.PicklistEntry s : stagePl) {
            stages.add(s.getLabel());
        }
        System.debug('stages '+stages); 
        return stages;
    }
    
    @AuraEnabled
    public static List<Account> getAccounts(){
        List<Account> accounts = [SELECT Id, Name FROM Account];
        return accounts;
    }
    
    @AuraEnabled
    public static Boolean saveContact(Contact contact, List<String> Ids){
        insert contact;
        List<AccountContactRelation> acr = new List<AccountContactRelation>();
        System.debug('Ids: '+Ids);
        for(String accountId : Ids){
            if(contact.AccountId != accountId){
            AccountContactRelation ac = new AccountContactRelation(
            AccountId = accountId,
                ContactId = contact.Id
            );
            acr.add(ac);
            }
        }
        insert acr;
        return true;
    }
}