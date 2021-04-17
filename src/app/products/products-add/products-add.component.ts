import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.scss']
})
export class ProductsAddComponent implements OnInit {

  name: String;
  protein: Number;
  carbs: Number;
  fats: Number;
  calories: Number;
  constructor(
    private productService: ProductService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }
 
  addProduct() {
    const product = {
      name: this.name,
      protein: this.protein,
      carbs: this.carbs,
      fats: this.fats,
      calories: this.calories
    }
    this.productService.addProduct(product).subscribe(data => {
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
  ngOnInit() {}
}
