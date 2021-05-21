import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MealService {
  token: any;
  product: any;

  baseUri = 'http://localhost:4000/api';

  constructor(private http: Http) { }

  addMeal(meal) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.baseUri + '/meal',
      meal,
      { headers: headers }).pipe(map(res => res.json()));
  }

  getMealPlan(caloriesNumber: Number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let result = this.http.post(
      this.baseUri + '/meal/plan',
      {
        calories: caloriesNumber
      },
      { headers: headers }).pipe(map(res => res.json()));
    return result;
  }

  getMeals() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      this.baseUri + '/meal',
      { headers: headers }).pipe(map(res => res.json()));
  }
  
  getMealById(mealId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let result = this.http.get(
      this.baseUri + `/meal/${mealId}`,
      { headers: headers }).pipe(map(res => res.json()));
    return result;
  }

  updateMeal(updateMeal: any, mealId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http.put(
      this.baseUri + `/meal/${mealId}`,
      updateMeal,
      { headers: headers }).pipe(map(res => res.json()));
  }

  deleteMeal(mealId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let result = this.http.post(
      this.baseUri + `/meal/${mealId}`,
      { headers: headers }).pipe(map(res => res.json()));
    return result;
  }

  addFavoriteMeal(userId: string, mealId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let result = this.http.put(
      this.baseUri + `/meal/${mealId}/favorite`,
      {
        userId: userId
      },
      { headers: headers }).pipe(map(res => res.json()));
    return result;
  }

  removeFavoriteMeal(userId: string, mealId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let result = this.http.put(
      this.baseUri + `/meal/${mealId}/unfavorite`,
      {
        userId: userId
      },
      { headers: headers }).pipe(map(res => res.json()));
    return result;
  }
}
