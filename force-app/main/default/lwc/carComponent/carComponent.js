import { LightningElement,api} from 'lwc';
export default class carComponent extends LightningElement {
    @api prod;

    handleClick(event) {
        const e = new CustomEvent('sendprodid', {
            detail: event.target.dataset.id
        });
        this.dispatchEvent(e);
    }
    downloadProd(event){
        console.log(event.target.dataset.id);
        const prodId = event.target.dataset.id;
        window.open(`/apex/ficheTechnique?id=${prodId}`, '_blank');
    }

}