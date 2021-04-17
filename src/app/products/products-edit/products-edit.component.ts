import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss']
})
export class ProductsEditComponent implements OnInit {
  
  product: any;

  name: String;
  protein: Number;
  carbs: Number;
  fats: Number;
  calories: Number;
  constructor(
    private productService: ProductService,
    private flashMessages: FlashMessagesService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  editProduct() {
    this.productService.updateProduct(this.product, this.activatedRouter.snapshot.paramMap.get('id')).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 2000
        });
        this.router.navigate(['/products']);
      }
    });
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() { 
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    this.productService.getProductById(id)
      .subscribe(p => this.product = p);
  }

}
