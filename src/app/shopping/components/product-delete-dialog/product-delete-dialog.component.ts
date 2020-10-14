import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Messages } from 'src/app/shared/constants/messages';
import { Product } from '../../models/product';
import { ProductNotificationService } from '../../services/product-notification.service';
import { ShoppingDataService } from '../../services/shopping-data.service';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.css']
})
export class ProductDeleteDialogComponent implements OnInit {

  productId: number;
  
  constructor(public activeModal: NgbActiveModal,
    private shoppingDataService: ShoppingDataService,
    private productNotificationService: ProductNotificationService
    ) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(): void {
    this.shoppingDataService.softDeleteProduct(this.productId);
    this.shoppingDataService.productListRefresh.next('refresh');
    this.activeModal.dismiss();
    this.productNotificationService.showSuccess(Messages.PRODUCT_TRASH_MOVE_MESSAGE);
  }

}
