import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  token: any;
  recipe: any;

  baseUri = 'http://localhost:4000/api';

  constructor(private http: Http) { }

  getRecipes() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      this.baseUri + '/recipe',
      { headers: headers }).pipe(map(res => res.json()));
  }
  
  getRecipeById(recipeId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let result = this.http.get(
      this.baseUri + `/recipe/${recipeId}`,
      { headers: headers }).pipe(map(res => res.json()));
    return result;
  }

  updateRecipe(updateRecipe: any, recipeId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http.put(
      this.baseUri + `/recipe/${recipeId}`,
      updateRecipe,
      { headers: headers }).pipe(map(res => res.json()));
  }
}
