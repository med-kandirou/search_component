import { LightningElement,track,wire } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import flowbiteCSS from '@salesforce/resourceUrl/flowbite_css';
import flowbiteJS from '@salesforce/resourceUrl/flowbite_js';
import getproduits from '@salesforce/apex/produitController.getprods';
import getCarsBymarques from '@salesforce/apex/produitController.getCarsBymarques';
import getStockbyProd from '@salesforce/apex/stockController.getStockbyProd';
import getStockbyId from '@salesforce/apex/stockController.getStockbyId';
import getDetailStock from '@salesforce/apex/stockController.getDetailStock';

export default class SearchComponent extends LightningElement {
  connectedCallback() {
    Promise.all([
      loadStyle(this, flowbiteCSS),
      loadScript(this, flowbiteJS),
    ])
    this.getprods();
  }
  inputValue=''; //input value
  produits; //store produit
  stocks; //store stock
  getprods(){
    getproduits().then((result) => {
      this.produits=result;
    })
  }
  search() {
    console.log(this.inputValue);
  }
  handleInputChange(event) {
    this.inputValue = event.target.value;
  }
  handlemarque(event) {
    getCarsBymarques({ marques: JSON.stringify(event.detail) }).then((result) => {
      this.produits=result;
    })
  }

  istockVisible = false;
  isprodVisible = true;
  getStockbyProd(event){
    getStockbyProd({IdProd:event.detail}).then((result) => {
      this.stocks=result;
      this.istockVisible=true;
      this.isprodVisible=false;
    })
  }

  selectedStock;
  getdetailStock(event){
    this.selectedStock=event.detail;
    this.getinfoStock();
    this.getDetail();
  }

  stock;
  options;
  getinfoStock(){
        getStockbyId({IdStock:this.selectedStock}).then((result)=>{
            this.stock=result;
            console.log(this.stock);
        })
    }
    getDetail(){
        getDetailStock({IdStock:this.selectedStock}).then((result)=>{
          this.options=result;
          console.log(this.options);
        })
    }

}