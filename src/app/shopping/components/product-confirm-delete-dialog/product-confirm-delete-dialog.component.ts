import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Messages } from 'src/app/shared/constants/messages';
import { ProductNotificationService } from '../../services/product-notification.service';
import { ShoppingDataService } from '../../services/shopping-data.service';

@Component({
  selector: 'app-product-confirm-delete-dialog',
  templateUrl: './product-confirm-delete-dialog.component.html',
  styleUrls: ['./product-confirm-delete-dialog.component.css']
})
export class ProductConfirmDeleteDialogComponent implements OnInit {

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
    this.shoppingDataService.deleteProduct(this.productId);
    this.shoppingDataService.trashListRefesh.next('refresh');
    this.activeModal.dismiss();
    this.productNotificationService.showSuccess(Messages.PRODUCT_DELETION_MESSAGE);
  }

}
