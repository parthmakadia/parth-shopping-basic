import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ShoppingDataService } from '../../services/shopping-data.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  form: FormGroup;
  productId: number;
  product: Product;

  constructor(
    private shoppingDataService: ShoppingDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initProductRatingData();
    this.getRouteData();
  }

  getRouteData() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.productId = params['id'];
        this.setProductData(this.productId);
      }
    })
  }

  setProductData(productId : number) {
    let products : Product[] = this.shoppingDataService.getAllProducts();
    this.product = products.find(element => element.productId == productId);
    this.form.patchValue({rating:this.product.rating});
  }

  initProductRatingData() {
    this.form = this.formBuilder.group({
      rating: [0]
    });
  }

}
