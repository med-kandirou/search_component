import { LightningElement ,api} from 'lwc';

export default class DetailComponent extends LightningElement {
    @api stock;
    @api options; 

    columns = [
        { label: 'Nom', fieldName: 'Name' },
    ];

}