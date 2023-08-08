import { LightningElement,api } from 'lwc';
export default class PopupComponent extends LightningElement {

    @api ismodalopen;
    @api stock;
    @api options; 
    selectedStock;
    closeModel() {
        const e = new CustomEvent('handleclose');
        this.dispatchEvent(e);
    }
    torecord(){
        for(let i=0;i<this.stock.length;i++){
            this.selectedStock=this.stock[i].Id;
        }
        const domain = new URL(window.location.href).hostname;
        window.open('https://' + domain + '/lightning/r/Stock__c/' + this.selectedStock + '/view', '_blank');
    }
    
    get rows() {
        return this.options.map(option => {
            return {
                id: option.Id, // Assurez-vous que le champ Id est présent dans vos options
                OptionName: option.Option__r.Name,
                Prix: option.Prix__c
            };
        });
    }
}