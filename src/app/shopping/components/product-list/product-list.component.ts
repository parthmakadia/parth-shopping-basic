import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../models/product';
import { ProductFilterService } from '../../services/product-filter.service';
import { ShoppingDataService } from '../../services/shopping-data.service';
import { ProductDeleteDialogComponent } from '../product-delete-dialog/product-delete-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productArr : Product[] = [];

  constructor(private shoppingDataService: ShoppingDataService,
    private router: Router,
    protected modalService: NgbModal,
    private productFilterService: ProductFilterService) { }

  ngOnInit(): void {
    this.refreshNotify();
    this.refreshSearchData();
    this.getAllProducts();
  }

  getAllProducts() {
    let productArrLocal: Product[] = this.shoppingDataService.getAllProducts();
    productArrLocal = productArrLocal.filter(p => p.stockAvailable == this.productFilterService.getSearchStockAvailable());
    this.productArr = productArrLocal;
  }

  viewProduct(productId: number) {
    this.router.navigate(['/view',productId]);
  }

  deleteProduct(product: Product) {
    const modalRef = this.modalService.open(ProductDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productId = product.productId;
  }

  editProduct(productId: number) {
    this.router.navigate(['/edit',productId]);
  }

  refreshNotify() {
    this.shoppingDataService.productListRefresh.subscribe(res=> {
      if(res == 'refresh') {
        this.getAllProducts();
        this.shoppingDataService.productListRefresh.next('');
      }
    });
  }

  refreshSearchData() {
    this.shoppingDataService.showFilteredData.subscribe(res=> {
      if(res == true) {
        this.shoppingDataService.filteredProducts.subscribe(res => {
          this.productArr = res;
        })
      }
    })
  }

}
