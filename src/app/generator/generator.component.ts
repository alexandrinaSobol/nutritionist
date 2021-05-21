import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../service/auth.service';
import { MealService } from '../service/meal.service';
import { MealCategory } from '../_models/category.enum';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  resultCalories: String;
  meals: any = [];
  displayedColumns: string[] = ['name', 'weight', 'calories', 'category', 'actions'];

  user: any;

  constructor(
    private _formBuilder: FormBuilder,
    private mealService: MealService,
    private authService: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      genre: ['', Validators.required],
      age: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      activityFactor: ['', Validators.required],
    });
    this.user = this.authService.getUser();
  }

  convertMealCategoryInt(categoryNumber) {
    return MealCategory[categoryNumber];
  }

  checkUserIsLogged() {
    return this.authService.isLoggedIn();
  }

  getData() {
    let age = this.firstFormGroup.controls['age'].value;
    let height = this.firstFormGroup.controls['height'].value;
    let weight = this.firstFormGroup.controls['weight'].value;
    let genre = this.firstFormGroup.controls['genre'].value;
    let activityFactor = this.secondFormGroup.controls['activityFactor'].value;

    let baseCalories = 0;

    if (genre === '1') {
      baseCalories = ((10 * weight) + (6.25 * height) - (5 * age) + 5);
    } else {
      baseCalories = ((10 * weight) + (6.25 * height) - (5 * age) - 161);
    }

    if (activityFactor == '5') {
      this.resultCalories = baseCalories * 1.9 + '';
    } else if (activityFactor == '4') {
      this.resultCalories = baseCalories * 1.725 + '';
    } else if (activityFactor == '3') {
      this.resultCalories = baseCalories * 1.55 + '';
    } else if (activityFactor == '2') {
      this.resultCalories = baseCalories * 1.375 + '';
    } else {
      this.resultCalories = baseCalories * 1.2 + '';
    }

    this.mealService.getMealPlan(Number(this.resultCalories)).subscribe((data) => {
      this.meals = data;
    });
  }

  getPlanCalories() {
    let totalCalories = 0;
    this.meals.forEach(meal => totalCalories += meal.calories);
    return totalCalories;
  }

  addFavorite(mealId) {
    let user = this.authService.getUser();
    if (arrayIncludesInObj(user.meals, '_id', mealId)) {
      this.flashMessages.show("Aceasta mancare a fost deja adaugata", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      this.mealService.addFavoriteMeal(user.id, mealId).subscribe(data => {
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
          this.mealService.getMealById(mealId).subscribe(data => {
            user.meals.push(data);
            this.authService.updateUser(user);
          });
        }
      });
    }
  }

  openReceipt(receiptId) {
    this.router.navigate([]).then(result => { window.open(`/recipes/details/${receiptId}`, '_blank'); });
  }
}

const arrayIncludesInObj = (arr, key, valueToCheck) => {
  return arr.some(value => value[key] === valueToCheck);
}
