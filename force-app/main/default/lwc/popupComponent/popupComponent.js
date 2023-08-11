import { LightningElement,api,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
export default class PopupComponent extends LightningElement {
    @api ismodalopen;
    @api stock;
    @api options; 
    selectedStock;

    //check if component in record page 
    inrecordpage=false;
    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
       if (currentPageReference) {
          let type = currentPageReference.type;
          this.recordId = currentPageReference.attributes.recordId || null;
          if(type=='standard__quickAction'){
             this.inrecordpage=true; 
          }
       }
    }

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

    stockId = '';
    oppId = '';
    isflowrunning = false;
    inputVariables = [];
    addStocktoOpp() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.oppId = urlParams.get('recordId');
        for (let i = 0; i < this.stock.length; i++) {
            this.stockId = this.stock[i].Id;
        }
        this.inputVariables = [
            {
                name: 'opp',
                type: 'String',
                value: this.oppId
            },
            {
                name: 'stock',
                type: 'String',
                value: this.stockId
            },
        ];
        this.isflowrunning = true;
    }
}