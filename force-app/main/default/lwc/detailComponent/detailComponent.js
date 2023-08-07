import { LightningElement ,api} from 'lwc';

export default class DetailComponent extends LightningElement {
    @api stock;
    @api options; 

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