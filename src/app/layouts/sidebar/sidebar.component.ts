import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/shopping/models/product';
import { ProductFilterService } from 'src/app/shopping/services/product-filter.service';
import { ShoppingDataService } from 'src/app/shopping/services/shopping-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private productFilterService: ProductFilterService,
    private shoppingDataService: ShoppingDataService) { }

  ngOnInit(): void {
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      searchStartRange:[0],
      searchEndRange:[0],
      searchLocation:[''],
      searchStockAvl:['true']
    });
  }

  onSearchChange() {
    let searchFormVal : any = this.searchForm.value;
    this.productFilterService.setFilterData(searchFormVal.searchStartRange, 
      searchFormVal.searchEndRange,
      searchFormVal.searchLocation,
      searchFormVal.searchStockAvl);
    let products : Product[] = this.shoppingDataService.getAllProducts();
    let filteredProducts : Product[] = this.productFilterService.filterProducts(products);
    this.shoppingDataService.showFilteredData.next(true);
    this.shoppingDataService.filteredProducts.next(filteredProducts);
  }

}
