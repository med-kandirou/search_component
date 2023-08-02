public class FicheTechniqueController {
    public List<Produit__c> data { get; set; }

    public FicheTechniqueController() {
        fetchDataFromApex();
    }

    public void fetchDataFromApex() {
        String prodId = ApexPages.currentPage().getParameters().get('id');
        data = [SELECT Id, Name, Marque__c, Modele__c, Serie__c FROM Produit__c WHERE Id = :prodId];
    }
}