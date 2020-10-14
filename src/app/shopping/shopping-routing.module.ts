import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDeleteDialogComponent } from './components/product-delete-dialog/product-delete-dialog.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductTrashComponent } from './components/product-trash/product-trash.component';
import { ProductViewComponent } from './components/product-view/product-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: {
      breadcrumb: 'Home'
    },
  },
  {
    path: 'add',
    component: ProductFormComponent,
    data: {
      breadcrumb: 'Add Product'
    },
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent,
    data: {
      breadcrumb: 'Edit Product'
    },
  },
  {
    path: 'view/:id',
    component: ProductViewComponent,
    data: {
      breadcrumb: 'View Product'
    },
  },
  {
    path: 'trash',
    component: ProductTrashComponent,
    data: {
      breadcrumb: 'Trash'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
