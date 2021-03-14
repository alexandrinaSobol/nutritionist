import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GeneratorComponent } from './generator/generator.component';
import { RecipesComponent } from './recipes/recipes.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FoodComponent } from './food/food.component';
import { MealComponent } from './meal/meal.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { IsLoggedIn } from './isLogged.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'generator', component: GeneratorComponent, canActivate: [IsLoggedIn] },
  { path: 'recipes', component: RecipesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'food', component: FoodComponent },
  { path: 'meal', component: MealComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [IsLoggedIn] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [IsLoggedIn]
})
export class AppRoutingModule { }
