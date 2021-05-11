import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../_models/recipe.model';
import { Router } from '@angular/router';
//import { url } from 'inspector';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})

export class RecipesComponent implements OnInit {
  dataSource: MatTableDataSource<Recipe>;
  displayedColumns = ['name', 'imageUrl', 'prepareTime', 'actions'];
  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() { this.updateRecipeList();
  
  }
  updateRecipeList() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.dataSource = new MatTableDataSource(recipes);
    });
  }
  checkUserIsStaff() {
    let user = this.authService.getUser(); 
    return user && user.isstaff;
  }

  detailRecipes(recipeId) {
    this.router.navigate([`recipes/details/${recipeId}`]);
  }
}