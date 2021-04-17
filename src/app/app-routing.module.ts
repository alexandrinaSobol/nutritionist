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
import { ProductsAddComponent } from './products/products-add/products-add.component';
import { MealAddComponent } from './meal/meal-add/meal-add.component';
import { IsLoggedIn } from './isLogged.guard';
import { ProductsComponent } from './products/products.component';
import { MealEditComponent} from './meal/meal-edit/meal-edit.component';
import { ProductsEditComponent } from './products/products-edit/products-edit.component';
import { IsStaff } from './isStaff.guard';
import { AboutComponent } from './about/about.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'generator', component: GeneratorComponent, canActivate: [IsLoggedIn] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'food', component: FoodComponent },
  { path: 'meals', component: MealComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [IsLoggedIn] },
  { path: 'products', component: ProductsComponent },
  { path: 'products/add', component: ProductsAddComponent, canActivate: [IsStaff] },
  { path: 'meals/add', component: MealAddComponent, canActivate: [IsStaff]},
  { path: 'products/edit/:id', component: ProductsEditComponent, canActivate: [IsStaff] },
  { path: 'meals/edit/:id', component: MealEditComponent, canActivate: [IsStaff] },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [IsLoggedIn, IsStaff]
})
export class AppRoutingModule { }
