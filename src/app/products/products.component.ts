import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ProductService } from '../service/product.service';
import { Product } from '../_models/product.meal';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any;

  dataSource: Observable<Product[]>;
  expandedElement: Product | null
  displayedColumns = ['name', 'protein', 'carbs', 'fats', 'calories', 'action'];

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService) { }
  
  ngOnInit() {
    this.updateProductList();
  }

  checkUserIsStaff() {
    let user = this.authService.getUser(); 
    return user && user.isstaff;
  }

  editProduct(productId) {
    this.router.navigate([`/products/edit/${productId}`]);
  }

  deleteProduct(productId) {
    this.productService.deleteProduct(productId).subscribe(data => {
      this.updateProductList();
    });
  }

  updateProductList() {
    this.dataSource = this.productService.getProducts();
  }
}