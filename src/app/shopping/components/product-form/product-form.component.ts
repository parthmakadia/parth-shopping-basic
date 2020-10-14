import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { Messages } from 'src/app/shared/constants/messages';
import { Product } from '../../models/product';
import { ProductNotificationService } from '../../services/product-notification.service';
import { ShoppingDataService } from '../../services/shopping-data.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  submitted: boolean = false;
  isEdit: boolean = false;
  productId: number;
  isAdd: boolean = false;
  editProductData : Product;

  constructor(private formBuilder: FormBuilder,
    private shoppingDataService: ShoppingDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productNotificationService : ProductNotificationService) { }

  ngOnInit(): void {
    this.buildProductForm();
    this.getRouteData();
  }

  getRouteData() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.productId = params['id'];
        this.isEdit = true;
        this.isAdd = false;
        this.setProductData(this.productId);
      } else {
        this.isAdd = true;
        this.isEdit = false;
      }
    })
  }

  buildProductForm() {
    this.productForm = this.formBuilder.group({
      productId: [0],
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(150)]],
      price: [0, Validators.required],
      rating: [''],
      location: ['', Validators.required],
      stockAvailable: [true, Validators.required],
      isDeleted: [false]
    });
  }

  get f() { return this.productForm.controls; }

  onReset() {
    this.submitted = false;
    this.productForm.reset();
    if(this.isEdit) {
      this.productForm.patchValue(this.editProductData);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.productForm.valid) {
      return;
    } else {
      if(this.isAdd) {
        this.shoppingDataService.addProduct(this.productForm.value);
        this.productNotificationService.showSuccess(Messages.PRODUCT_CREATION_MESSAGE);
      } else {
        this.shoppingDataService.editProduct(this.productForm.value);
        this.productNotificationService.showSuccess(Messages.PRODUCT_UPDATION_MESSAGE);
      }
      this.router.navigateByUrl('');
    }
  }

  setProductData(productId : number) {
    let products : Product[] = this.shoppingDataService.getAllProducts();
    this.editProductData = products.find(element => element.productId == productId);
    this.productForm.patchValue(this.editProductData);
  }

}
