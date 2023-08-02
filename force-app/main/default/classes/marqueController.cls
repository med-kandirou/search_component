public with sharing class marqueController {
    @AuraEnabled(cacheable=true)
    public static List<String> getMarquePicklistValues() {
        List<String> picklistValues = new List<String>();
        Schema.SObjectType objectType = Schema.getGlobalDescribe().get('produit__c');
        if (objectType != null) {
            Schema.DescribeSObjectResult objectDescribe = objectType.getDescribe();
            if (objectDescribe.fields.getMap().containsKey('marque__c')) {
                Schema.DescribeFieldResult fieldDescribe = objectDescribe.fields.getMap().get('marque__c').getDescribe();
                if (fieldDescribe.getType() == Schema.DisplayType.PICKLIST) {
                    for (Schema.PicklistEntry entry : fieldDescribe.getPicklistValues()) {
                        picklistValues.add(entry.getLabel());
                    }
                }
            }
        }
        return picklistValues;
    }
}