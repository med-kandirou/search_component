import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import flowbiteCss from '@salesforce/resourceUrl/flowbite_css';
import getproduits from '@salesforce/apex/produitController.getprods';
import getCarsBymarques from '@salesforce/apex/produitController.getCarsBymarques';
import getStockbyProd from '@salesforce/apex/stockController.getStockbyProd';
import getStockbyId from '@salesforce/apex/stockController.getStockbyId';
import getDetailStock from '@salesforce/apex/stockController.getDetailStock';
import recherche from '@salesforce/apex/stockController.recherche';

export default class SearchComponent extends LightningElement {
  connectedCallback() {
    Promise.all([
      loadStyle(this, flowbiteCss)
    ])
    this.getprods();
  }
  inputValue=''; //input value
  produits; //store produit
  stocks; //store stock
  getprods(){
    this.ispinnerVisible=true;
    getproduits().then((result) => {
      this.produits=result;
      if(result.length>0){
        this.ispinnerVisible=false;
      }
    })
  }
  search() {
    // this.ispinnerVisible=true;
    recherche({input:this.inputValue}).then((result)=>{
      this.stocks=result;
      this.istockVisible=true;
      this.isprodVisible=false;
      // if(result.length>0){
      //   this.ispinnerVisible=false;
      // }
    })
  }
  handleInputChange(event) {
    this.inputValue = event.target.value;
  }
  handlemarque(event) {
    this.ispinnerVisible=true;
    getCarsBymarques({ marques: JSON.stringify(event.detail) }).then((result) => {
      this.produits=result;
      if(result.length>0){
        this.ispinnerVisible=false;
      }
    })
  }

  istockVisible = false;
  isprodVisible = true;
  ispinnerVisible=false;
  getStockbyProd(event){
    this.ispinnerVisible=true;
    getStockbyProd({IdProd:event.detail}).then((result) => {
      this.stocks=result;
      this.istockVisible=true;
      this.isprodVisible=false;
      if(result.length>0){
        this.ispinnerVisible=false;
      }
    })
  }
  isModalopen=false;
  selectedStock;
  getdetailStock(event){
    this.selectedStock=event.detail;
    this.getinfoStock();
    this.getDetail();
    this.isModalopen=true;
  }

  stock;
  options;
  getinfoStock(){
        this.ispinnerVisible=true;
        getStockbyId({IdStock:this.selectedStock}).then((result)=>{
          this.stock=result;
          if(result.length>0){
            this.ispinnerVisible=false;
          }
        })
  }

  getDetail(){
      this.ispinnerVisible=true;
      getDetailStock({IdStock:this.selectedStock}).then((result)=>{
        this.options=result;
        this.istockVisible=true;
        this.isprodVisible=false;
        if(result.length>0){
          this.ispinnerVisible=false;
        }
    })
  }
  btntoprod(){
    this.isprodVisible=true;
    this.istockVisible=false;
  }
  closeModal(){
    this.isModalopen=false;
  }
}