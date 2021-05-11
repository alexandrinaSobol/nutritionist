import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/service/recipe.service';
import { Meal } from 'src/app/_models/meal.model';
import { Product } from 'src/app/_models/product.meal';
import { MatTableDataSource } from '@angular/material';
import { Recipe } from 'src/app/_models/recipe.model';
import { MealCategory } from 'src/app/_models/category.enum';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe = <Recipe>{};
  mealId: any;

  constructor(
    private activatedRouter: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }
  
  convertMealCategoryInt(categoryNumber) {
    return MealCategory[categoryNumber];
  }

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe() {
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    this.recipeService.getRecipeById(id)
      .subscribe(r => {
        this.recipe = r;
        this.mealId = r.meal._id;
      });
  }
}
