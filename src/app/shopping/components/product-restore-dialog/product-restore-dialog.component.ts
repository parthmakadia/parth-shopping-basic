import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Messages } from 'src/app/shared/constants/messages';
import { ProductNotificationService } from '../../services/product-notification.service';
import { ShoppingDataService } from '../../services/shopping-data.service';

@Component({
  selector: 'app-product-restore-dialog',
  templateUrl: './product-restore-dialog.component.html',
  styleUrls: ['./product-restore-dialog.component.css']
})
export class ProductRestoreDialogComponent implements OnInit {

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

  restoreProduct(): void {
    this.shoppingDataService.restoreProduct(this.productId);
    this.shoppingDataService.trashListRefesh.next('refresh');
    this.activeModal.dismiss();
    this.productNotificationService.showSuccess(Messages.PRODUCT_RESTORE_MESSAGE);
  }

}
