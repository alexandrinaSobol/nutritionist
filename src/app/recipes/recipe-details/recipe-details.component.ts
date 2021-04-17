import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/service/recipe.service';
import { Meal } from 'src/app/_models/meal.model';
import { Product } from 'src/app/_models/product.meal';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  sel = 0;
  constructor(
    private activatedRouter: ActivatedRoute,
    private recipeService: RecipeService,
  ) { }

  // getMeal() {
  //   const id = this.activatedRouter.snapshot.paramMap.get('id');
  //   this.recipeService.getRecipeById(id)
  //     .subscribe(p => {
  //       this.meal = p;
  //       this.calculateTotalValues();
  //     });
  // }

  // recipes = [
  //   {
  //     id: 0,
  //     url: 'http://localhost:4200/food/',
  //     image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7690928.jpg&w=550&h=550&c=sc&poi=face&q=85',
  //     description: 'Two Cypriot specialties--good olive oil and fresh lemons--lend sunny flavor to this simple ' +
  //       'bean dish, served as a side in Cyprus. ' +
  //       'Chard adds a hearty touch. Top with a dollop of Greek yogurt, or nondairy yogurt to keep it ' +
  //       'vegan, for a meatless meal. Source: EatingWell Magazine, March 2020',
  //     recipeDescription: 'Doua ousoare dragalase si sexuale mimimimimimimi'
  //   },
  //   {
  //     id: 1,
  //     url: 'http://localhost:4200/food/',
  //     image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7493339.jpg&w=550&h=550&c=sc&poi=face&q=85"',
  //     description: 'Edamame make these homemade veggie burgers mean, green protein machines. Peanut sauce, curry'+
  //     'paste and quick-pickled carrots give them Thai-inspired flair',
  //     recipeDescription: 'knoiho'
  //   },
  //   {
  //     id: 2,
  //     url: 'http://localhost:4200/food/',
  //     image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8114998.jpg&w=550&h=550&c=sc&poi=face&q=85"',
  //     description: 'This peanut-tofu noodles dish is inspired by chow mein, a Chinese-American dish featuring'+
  //     'fried noodles. Pan-crisping the noodles here mimics the crunch of the traditional dish, but'+
  //     'limits the saturated fat.',
  //     recipeDescription: 'oinkioiko'
  //   },
  //   {
  //     id: 3,
  //     url: 'http://localhost:4200/food/',
  //     image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8124245.jpg&w=550&h=550&c=sc&poi=face&q=85"',
  //     description: 'This colorful platter salad with origins in the south of France makes a well-balanced and' +
  //   'satisfying hot-weather meal. Coating the potatoes in dressing while they are still hot helps'+
  //     'them absorb the flavors.',
  //     recipeDescription: 'hbj'
  //   },
  //   {
  //     id: 4,
  //     url: 'http://localhost:4200/food/',
  //     image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F6101407.jpg&w=550&h=550&c=sc&poi=face&q=85"',
  //     description: 'Grilled salmon filets add a nice dose of protein to this classic Niçoise salad. A simple' +
  //     'lemon vinaigrette comes together quickly and really enhances the flavors in this healthy',
  //     recipeDescription: 'jknjk'
  //   },
  //   {
  //     id: 5,
  //     url: 'http://localhost:4200/food/',
  //     image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F5458816.jpg&w=550&h=550&c=sc&poi=face&q=85"',
  //     description: 'Incorporating salmon into salads adds a good source of protein and heart healthy omega-3' +	 
  //     'fatty acids. This quick-and-easy salad is perfect for a lunch or dinner and is sure to leave' +
  //   'you feeling full and satisfied',
  //     recipeDescription: 'jkkiu'
  //   },
  //   {
  //     id: 6,
  //     url: 'http://localhost:4200/food/',
  //     image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8059219.jpg&w=550&h=550&c=sc&poi=face&q=85""',
  //     description: 'With pancetta, lettuce and tomato, this pie combines salad and pizza all in one, a pizz-alad' +
  //     'if you will! It s a delicious mess--serve it with knives, forks and plenty of napkins.',
  //     recipeDescription: 'joij'
  //   },
  // ];

  ngOnInit() { 
  
  }

  // selected(event) {

  //   this.sel = event.id;
  //   console.log('EVENT -> ', event);
  // }
}
