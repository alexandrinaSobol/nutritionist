import { Component, OnInit } from '@angular/core';
//import { RecipesComponent } from './recipes/recipes.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'nutritionist';

  constructor() { }

  ngOnInit() {
  }

}
