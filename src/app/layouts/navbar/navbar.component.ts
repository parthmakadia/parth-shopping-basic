import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/shopping/models/product';
import { ProductFilterService } from 'src/app/shopping/services/product-filter.service';
import { ShoppingDataService } from 'src/app/shopping/services/shopping-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    private productFilterService: ProductFilterService,
    private shoppingDataService: ShoppingDataService) { }

  ngOnInit(): void {
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      searchStr:['']
    });
  }

  onSearchChange() {
    let formValue = this.searchForm.value;
    this.productFilterService.setSearchStr(formValue.searchStr);
    let products : Product[] = this.shoppingDataService.getAllProducts();
    let filteredProducts : Product[] = this.productFilterService.filterProducts(products);
    this.shoppingDataService.showFilteredData.next(true);
    this.shoppingDataService.filteredProducts.next(filteredProducts);
  }

}
