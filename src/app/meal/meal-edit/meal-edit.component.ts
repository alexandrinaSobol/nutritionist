import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MealService } from 'src/app/service/meal.service';
import { ProductService } from 'src/app/service/product.service';
import { Meal } from 'src/app/_models/meal.model';
import { Product } from 'src/app/_models/product.meal';

@Component({
  selector: 'app-meal-edit',
  templateUrl: './meal-edit.component.html',
  styleUrls: ['./meal-edit.component.scss']
})
export class MealEditComponent implements OnInit {
  meal: Meal = <Meal>{};
  products: Product[];

  weightTotal: number;
  proteinTotal: number;
  carbsTotal: number;
  fatsTotal: number;
  caloriesTotal: number;

  ingredient: Product;
  ingredientAmount: number;

  constructor(
    private productService: ProductService,
    private mealService: MealService,
    private flashMessages: FlashMessagesService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  onEditProduct() {
    this.meal.weight = this.weightTotal;
    this.meal.protein = this.proteinTotal;
    this.meal.carbs = this.carbsTotal;
    this.meal.fats = this.fatsTotal;
    this.meal.calories = this.caloriesTotal;

    this.mealService.updateMeal(this.meal, this.activatedRouter.snapshot.paramMap.get('id')).subscribe(data => {
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
        this.router.navigate(['/meals']);
      }
    });
  }

  ngOnInit() {
    this.getMeal();
    this.updateProductList();
  }

  getMeal() {
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    this.mealService.getMealById(id)
      .subscribe(p => {
        this.meal = p;
        this.calculateTotalValues();
      });
  }

  getTotal(value) {
    let total = 0;
    for (let i = 0; i < this.meal.ingredients.length; i++) {
      total = total + this.meal.ingredients[i][value];
    }
    return total;
  }

  calculateTotalValues() {
    this.weightTotal = this.getTotal('weight');
    this.proteinTotal = this.getTotal('protein');
    this.carbsTotal = this.getTotal('carbs');
    this.fatsTotal = this.getTotal('fats');
    this.caloriesTotal = this.getTotal('calories');
  }

  onAddIngredient() {
    if (arrayIncludesInObj(this.meal.ingredients, 'name', this.ingredient.name)) {
      return;
    }
    this.ingredient.weight = this.ingredientAmount;
    for (const value in this.ingredient) {
      if (this.ingredient.hasOwnProperty(value) && value !== 'name' && value !== 'weight') {
        this.ingredient[value] = Math.round(this.ingredient[value] * this.ingredient.weight / 100);
      }
    }
    this.meal.ingredients.push(this.ingredient);
    this.calculateTotalValues();
    this.ingredientAmount = null;
    this.ingredient = null;
  }

  onDeleteIngredient(ingredientIndex: number) {
    this.meal.ingredients.splice(ingredientIndex, 1);
  }

  updateProductList() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products as Product[]
      });
  }
}

const arrayIncludesInObj = (arr, key, valueToCheck) => {
  return arr.some(value => value[key] === valueToCheck);
}