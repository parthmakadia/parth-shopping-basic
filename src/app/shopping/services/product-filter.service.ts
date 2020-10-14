import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  private searchStr: string = '';
  private searchStartRange: number = 0;
  private searchEndRange: number = 0;
  private searchLocation: string = '';
  private searchStockAvl: string = 'true';

  constructor() { }

  public getSearchStockAvailable() : string{
    return this.searchStockAvl;
  }

  public setFilterData(searchStartRange: number,
    searchEndRange: number,
    searchLocation: string,
    searchStockAvl: string) {
      this.searchStartRange = searchStartRange;
      this.searchEndRange = searchEndRange;
      this.searchLocation = searchLocation;
      this.searchStockAvl = searchStockAvl;
  }

  public setSearchStr(searchStr: string) {
    this.searchStr = searchStr;
  }

  public filterProducts(products: Product[]) : Product[] {
    let filterProducts = products;

    if(this.searchStartRange >= 0 && this.searchEndRange > 0) {
      filterProducts = filterProducts.filter(product => product.price > this.searchStartRange && product.price < this.searchEndRange);
    }

    if(this.searchLocation != '') {
      filterProducts = filterProducts.filter(product => product.location == this.searchLocation);
    }

    filterProducts = filterProducts.filter(product => product.stockAvailable == this.searchStockAvl);

    if(this.searchStr != '' && this.searchStr.length > 0) {
      filterProducts = filterProducts.filter(
        product => product.title.toLowerCase().indexOf(this.searchStr.toLowerCase()) > -1 ||
        product.description.toLowerCase().indexOf(this.searchStr.toLowerCase()) > -1
      );
    }
    return filterProducts;
  }
}
