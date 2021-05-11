import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/service/recipe.service';
import { Meal } from 'src/app/_models/meal.model';
import { Product } from 'src/app/_models/product.meal';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  dataSource: MatTableDataSource<Meal>;
  constructor(
    private activatedRouter: ActivatedRoute,
    private recipeService: RecipeService,
  ) { }

  sel = 0;

  getMeal() {
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    this.recipeService.getRecipeById(id)
      .subscribe();
  }

  recipe = {
    title: "Omleta",
    prepareTime: '1h:10m',
    steps: [
      'Luam ceva',
      'Taiem totul pana la 0',
      'Dupa care luam si obtinem',
      'Doua ousoare dragalase si sexuale mimimimimimimi'
    ],
    imageUrl: [
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7690928.jpg',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7493339.jpg',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8114998.jpg',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8124245.jpg',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F6101407.jpg',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F5458816.jpg',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8059219.jpg'
    ]
  };

  ngOnInit() { 
    this.updateRecipeList();
  
  }
  updateRecipeList() {
    this.recipeService.getRecipes().subscribe(meals => {
      this.dataSource = new MatTableDataSource(meals);
    });
  }

  selected(event) {
    this.sel = event.id;
    console.log('EVENT -> ', event);
  }
}
