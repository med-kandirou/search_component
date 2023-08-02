import { LightningElement, track } from 'lwc';
import getMarquePicklistValues from '@salesforce/apex/marqueController.getMarquePicklistValues';

export default class CheckboxGroupComponent extends LightningElement {
    @track options = []; // List of options to be displayed in the checkbox group
    @track selectedValues = []; // Selected values in the checkbox group

    connectedCallback() {
        this.loadData();
    }

    loadData() {
        getMarquePicklistValues()
            .then((result) => {
                this.options = result.map((record) => ({
                    label: record, 
                    value: record
                }));
            })
    }

    handleChange(event) {
        //this.selectedValues = event.detail.value;
        const e = new CustomEvent('sendmarque', {
            detail: event.detail.value
        });
        this.dispatchEvent(e);
    }
}