import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ProductTrashComponent } from './components/product-trash/product-trash.component';
import { ProductDeleteDialogComponent } from './components/product-delete-dialog/product-delete-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductRestoreDialogComponent } from './components/product-restore-dialog/product-restore-dialog.component';
import { ProductConfirmDeleteDialogComponent } from './components/product-confirm-delete-dialog/product-confirm-delete-dialog.component';

@NgModule({
  declarations: [ProductListComponent, ProductFormComponent, ProductViewComponent, ProductTrashComponent, ProductDeleteDialogComponent, ProductRestoreDialogComponent, ProductConfirmDeleteDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxInputStarRatingModule,
    ShoppingRoutingModule,
    NgxImageZoomModule,
    NgbModule
  ]
})
export class ShoppingModule { }
