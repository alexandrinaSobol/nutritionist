import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RecipeService } from 'src/app/service/recipe.service';
import { Recipe } from 'src/app/_models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  
  recipe: Recipe = <Recipe>{};

  newImageUrl: string;
  newStep: string;

  constructor(
    private activatedRouter: ActivatedRoute,
    private recipeService: RecipeService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe() {
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    this.recipeService.getRecipeById(id)
      .subscribe(r => {
        this.recipe = r;
      });
  }

  onEditRecipe() {
    this.recipeService.updateRecipe(this.recipe, this.activatedRouter.snapshot.paramMap.get('id')).subscribe(data => {
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
        this.router.navigate(['/recipes']);
      }
    });
  }

  onAddNewStep() {
    this.recipe.steps.push(this.newStep);
    this.newStep = null;
  }
  onDeleteStep(stepIndex: number) {
    this.recipe.steps.splice(stepIndex, 1);
  }

  onAddNewImage() {
    this.recipe.imageUrl.push(this.newImageUrl);
    this.newImageUrl = null;
  }
  onDeleteImageUrl(imageUrlIndex: number) {
    this.recipe.imageUrl.splice(imageUrlIndex, 1);
  }
}
