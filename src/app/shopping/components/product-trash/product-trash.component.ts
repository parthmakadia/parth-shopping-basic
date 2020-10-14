import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../models/product';
import { ShoppingDataService } from '../../services/shopping-data.service';
import { ProductConfirmDeleteDialogComponent } from '../product-confirm-delete-dialog/product-confirm-delete-dialog.component';
import { ProductRestoreDialogComponent } from '../product-restore-dialog/product-restore-dialog.component';

@Component({
  selector: 'app-product-trash',
  templateUrl: './product-trash.component.html',
  styleUrls: ['./product-trash.component.css']
})
export class ProductTrashComponent implements OnInit {

  trashProducts: Product[];

  constructor(
    private shoppingDataService: ShoppingDataService,
    protected modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getTrashData();
    this.refreshNotify();
  }

  getTrashData() {
    this.trashProducts = this.shoppingDataService.getSoftDeletedProducts();  
  }

  refreshNotify() {
    this.shoppingDataService.trashListRefesh.subscribe(res=> {
      if(res == 'refresh') {
        this.getTrashData();
        this.shoppingDataService.trashListRefesh.next('');
      }
    });
  }

  openConfirmDeleteDialog(productId : number) {
    const modalRef = this.modalService.open(ProductConfirmDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productId = productId;
  }

  openRestoreDialog(productId: number) {
    const modalRef = this.modalService.open(ProductRestoreDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productId = productId;
  }

}
