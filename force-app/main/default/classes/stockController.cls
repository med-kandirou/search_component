public  with sharing class stockController {
	@AuraEnabled(cacheable=true)
    public static List<Stock__c> getStockbyProd(String IdProd){
        return [SELECT Id,N_Chassis__c, Name, status__c,PPCM__c FROM Stock__c WHERE Produit__c = :IdProd ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Stock__c> getStockbyId(String IdStock){
        return [SELECT Id,N_Chassis__c, Name, status__c,PPCM__c FROM Stock__c WHERE Id=:IdStock];
    }
  
    @AuraEnabled(cacheable=true)
    public static List<SObject> getDetailStock(String IdStock){
        return [SELECT Id, Name FROM Option__c WHERE Id IN (SELECT Option__c FROM OptionStock__c WHERE Stock__c = :IdStock)];
    }
    @AuraEnabled(cacheable=true)
    public static List<Stock__c> recherche(String input){
        List<String> words = input.split(' ');
        String concatenatedString = '';
        List<id> stockIds = new List<id>();
		concatenatedString = String.join(words, ' OR ');  
        List<List<SObject>> idfromProd=[FIND :concatenatedString IN ALL FIELDS RETURNING Produit__c(Id)];
        List<List<SObject>> idfromStock=[FIND :concatenatedString IN ALL FIELDS RETURNING Stock__c(Id)];
        List<List<SObject>> idfromOption=[FIND :concatenatedString IN ALL FIELDS RETURNING Option__c(Id)];
        //get Ids stock from Produit
        List<Id> produitIds = new List<Id>();
        for (List<SObject> objList : idfromProd) {
    		for (SObject obj : objList) {
                 produitIds.add(obj.Id);
            }
		}
        for(Stock__c st:[SELECT Id FROM Stock__c WHERE Produit__c IN :produitIds]){
            stockIds.add(st.Id);
        }
        //get Ids stock from Stock
        for (List<SObject> objList : idfromStock) {
    		for (SObject obj : objList) {
                stockIds.add(obj.Id);
            }
		}
        //get Ids stock from Option
        List<Id> optionIds = new List<Id>();
        for (List<SObject> objList : idfromOption) {
    		for (SObject obj : objList) {
                optionIds.add(obj.Id);
            }
		}
        for(Stock__c opt:[SELECT Id FROM Stock__c WHERE Id IN (SELECT Stock__c FROM OptionStock__c WHERE Option__c IN :optionIds)]){
            stockIds.add(opt.Id);
        }
        List<Stock__c> resultat= [SELECT Id,Name,PPCM__c,Status__c FROM Stock__c WHERE Id IN :hepler.getOccurance(stockIds)]; 
        return resultat;
    }
}