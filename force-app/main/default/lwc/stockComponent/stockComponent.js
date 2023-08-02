import { LightningElement ,api} from 'lwc';
export default class StockComponent extends LightningElement {
    @api stock;

    handleClick(event) {
        const e = new CustomEvent('sendidstock', {
            detail:  event.target.dataset.id
        });
        this.dispatchEvent(e);
    }

}