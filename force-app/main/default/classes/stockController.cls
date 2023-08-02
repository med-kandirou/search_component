public  with sharing class stockController {
	@AuraEnabled(cacheable=true)
    public static List<Stock__c> getStockbyProd(String IdProd){
        return [SELECT Id,N_Chassis__c, Name, status__c,PPCM__c FROM Stock__c WHERE Produit__c = :IdProd ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Stock__c> getStockbyId(String IdStock){
        return [SELECT Id,N_Chassis__c, Name, status__c,PPCM__c FROM Stock__c WHERE Id=:IdStock];
    }
    //a018e00000iuxp0AAA
    @AuraEnabled(cacheable=true)
    public static List<SObject> getDetailStock(String IdStock){
        return [SELECT Id, Name
                    FROM Option__c
                    WHERE Id IN (
                      SELECT Option__c
                      FROM OptionStock__c
                      WHERE Stock__c = :IdStock
                    )

				];
    }
}