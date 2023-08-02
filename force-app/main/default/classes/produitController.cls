public class produitController {
    @AuraEnabled(cacheable=true)
    public static List<Produit__c> getprods(){
        return [SELECT Id,Marque__c, Modele__c,Name,Serie__c from Produit__c LIMIT 9];
    }
    @AuraEnabled(cacheable=true)
    public static List<Produit__c> getCarsBymarques(String marques) {
        List<String> splitArray = marques.split(',');
        String conditionList ='';
        for (integer i=0;i<splitArray.size();i++) {
            splitArray[i]=splitArray[i].replace('[','');
            splitArray[i]=splitArray[i].replace(']','');
            splitArray[i]=splitArray[i].replace('"','\'');
            if(i==splitArray.size()-1){
                conditionList+=' ' + splitArray[i];
            }
            else{
                conditionList+=' ' + splitArray[i] + ' OR Marque__c = ';
            }
        }
        List<Produit__c> prods = (List<Produit__c>)Database.query('SELECT Id, Marque__c, Modele__c, Name, Serie__c FROM Produit__c WHERE Marque__c = '+conditionList);
		return prods;        
    }
}