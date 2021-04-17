import { animate, state, style, transition, trigger } from '@angular/animations';
import {Component, AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../service/auth.service';
import { MealService } from '../service/meal.service';
import { Meal } from '../_models/meal.model';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MealComponent implements AfterViewInit {

  dataSource: MatTableDataSource<Meal>;
  columnsToDisplay = ['name', 'weight', 'calories', 'category'];
  expandedElement: Meal | null;
  user: any;

  constructor(
    private router: Router,
    private mealService: MealService,
    private authService: AuthService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.updateMealList();
  }

  deleteMeal(productId) {
    this.mealService.deleteMeal(productId).subscribe(data => {
      this.updateMealList();
    });
  }

  updateMealList() {
    this.mealService.getMeals().subscribe(meals => {
      this.dataSource = new MatTableDataSource(meals);
    });
  }

  checkUserIsLogged() {
    return this.authService.isLoggedIn();
  }

  checkUserIsStaff() {
    return this.authService.getUser().isstaff;
  }

  ngAfterViewInit(): void { }

  editMeal(mealId) {
    this.router.navigate([`/meals/edit/${mealId}`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
}

const arrayIncludesInObj = (arr, key, valueToCheck) => {
  return arr.some(value => value[key] === valueToCheck);
}