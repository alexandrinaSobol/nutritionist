import { Component, OnInit } from '@angular/core';
import { Product } from '../../_models/product.meal';
import { ProductService } from 'src/app/service/product.service';
import { Meal } from 'src/app/_models/meal.model';
import { MealService } from 'src/app/service/meal.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-meal-add',
  templateUrl: './meal-add.component.html',
  styleUrls: ['./meal-add.component.scss']
})
export class MealAddComponent implements OnInit {
  meal: Meal = <Meal>{};
  products: Product[];
  selectedIngredient: Product;
  ingredient: Product;
  ingredientAmount: number;
  weightTotal: number;
  proteinTotal: number;
  carbsTotal: number;
  fatsTotal: number;
  caloriesTotal: number;
  selectedCategory: string;

  name: string;
  category: string;
  imageUrl: string;

  ingredients: Product[] = <Product[]>[];

  constructor(
    private productService: ProductService,
    private mealService: MealService,
    private flashMessages: FlashMessagesService,
    private router: Router) { 
  }

  ngOnInit() {
    this.updateProductList();
  }
  
  onAddMeal() {
    this.meal.name = this.name;
    this.meal.category = this.category.trim();
    this.meal.imageUrl = this.imageUrl.trim();
    this.meal.ingredients = this.ingredients;
    this.meal.weight = this.weightTotal;
    this.meal.protein = this.proteinTotal;
    this.meal.carbs = this.carbsTotal;
    this.meal.fats = this.fatsTotal;
    this.meal.calories = this.caloriesTotal;

    this.mealService.addMeal(this.meal).subscribe(data => {
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

  onAddIngredient() {
    if (arrayIncludesInObj(this.ingredients, 'name', this.ingredient.name)) {
      return;
    }
    this.selectedIngredient = this.ingredient;
    this.selectedIngredient.weight = this.ingredientAmount;
    for (const value in this.selectedIngredient) {
      if (this.selectedIngredient.hasOwnProperty(value) && value !== 'name' && value !== 'weight') {
        this.selectedIngredient[value] = Math.round(this.selectedIngredient[value] * this.selectedIngredient.weight / 100);
      }
    }
    this.ingredients.push(this.selectedIngredient);
    this.calculateTotalValues();
    this.ingredientAmount = null;
    this.ingredient = null;
  }

  getTotal(value) {
    let total = 0;
    for (let i = 0; i < this.ingredients.length; i++) {
      total = total + this.ingredients[i][value];
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

  onDeleteIngredient(ingredientIndex: number) {
    this.ingredients.splice(ingredientIndex, 1);
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