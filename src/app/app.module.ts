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
    MealComponent
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
    HttpModule
  ],
  providers: [
    ApiService,
    CheckFormService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
