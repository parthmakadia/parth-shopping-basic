import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingDataService {

  productCounter : number = 1;

  products: Product[]  = [];

  private productsSubject = new Subject<Product[]>();

  public productListRefresh = new Subject<string>();

  public trashListRefesh = new Subject<String>();

  public showFilteredData = new Subject<Boolean>();

  public filteredProducts = new Subject<Product[]>();

  constructor() {
    this.readLocalStorage();
    this.productListRefresh.next('');
    this.trashListRefesh.next('');
    this.showFilteredData.next(false);
    this.filteredProducts.next([]);
   }

  updateLocalStorage(productsLocal: Product[]) {
    localStorage.setItem('products',JSON.stringify(productsLocal));
    localStorage.setItem('counter', this.productCounter.toString());
  }

  addProduct(product: Product) {
    this.productCounter++;
    product.productId = this.productCounter;
    this.products.push(product);
    this.productsSubject.next(this.products);
    this.updateLocalStorage(this.products);
  }

  editProduct(product:Product) {
    let productArrIndex = this.products.findIndex(p=> p.productId == product.productId);
    this.products[productArrIndex] = product;
    this.productsSubject.next(this.products);
    this.updateLocalStorage(this.products);
  }

  softDeleteProduct(productId: number) {
    let productArrIndex = this.products.findIndex(p=> p.productId == productId);
    this.products[productArrIndex].isDeleted = true;
    this.productsSubject.next(this.products);
    this.updateLocalStorage(this.products);
  }

  restoreProduct(productId: number) {
    let productArrIndex = this.products.findIndex(p=> p.productId == productId);
    this.products[productArrIndex].isDeleted = false;
    this.productsSubject.next(this.products);
    this.updateLocalStorage(this.products);
  }

  deleteProduct(productId : number) {
    let productArrIndex = this.products.findIndex(p=> p.productId == productId);
    if (productArrIndex > -1) {
      this.products.splice(productArrIndex, 1);
    }
    this.productsSubject.next(this.products);
    this.updateLocalStorage(this.products);
  }

  readLocalStorage() {
    this.products = JSON.parse(localStorage.getItem('products') || '[]');
    if(localStorage.getItem('counter') == undefined || localStorage.getItem('counter') == null || localStorage.getItem('counter') == '' ) {
      this.productCounter = 0;
    } else {
      this.productCounter = parseInt(localStorage.getItem('counter'));
    }
    this.productsSubject.next(this.products);
  }

  getAllProducts(): Product[] {
    this.readLocalStorage();
    let activeProducts : Product[] = this.products.filter(product => product.isDeleted == false);
    return activeProducts;
  }

  getSoftDeletedProducts() : Product[] {
    this.readLocalStorage();
    let softDeletedProducts : Product[] = this.products.filter(product => product.isDeleted == true);
    return softDeletedProducts;
  }

}
