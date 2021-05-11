import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpModule } from '@angular/http';

import { ApiService } from './service/api.service';
import { CheckFormService } from './service/check-form.service';
import { AuthService } from './service/auth.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GeneratorComponent } from './generator/generator.component';
import { RecipesComponent } from './recipes/recipes.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FoodComponent } from './food/food.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MealComponent } from './meal/meal.component';
import { MealAddComponent } from './meal/meal-add/meal-add.component';
import { ProductsComponent } from './products/products.component';
import { ProductsAddComponent } from './products/products-add/products-add.component';
import { ProductsEditComponent } from './products/products-edit/products-edit.component';
import { MealEditComponent } from './meal/meal-edit/meal-edit.component';
import { AboutComponent } from './about/about.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { FacebookModule } from 'ngx-facebook';
import { MatCarouselModule } from '@ngmodule/material-carousel';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GeneratorComponent,
    RecipesComponent,
    LoginComponent,
    RegisterComponent,
    FoodComponent,
    HeaderComponent,
    DashboardComponent,
    MealComponent,
    MealAddComponent,
    ProductsComponent,
    ProductsAddComponent,
    ProductsEditComponent,
    MealEditComponent,
    AboutComponent,
    RecipeDetailsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    HttpModule,
    FacebookModule.forRoot(),
    MatCarouselModule.forRoot(),
  ],
  providers: [
    ApiService,
    CheckFormService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
