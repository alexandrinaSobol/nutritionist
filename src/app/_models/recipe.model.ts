import { Meal } from "./meal.model";

export class Recipe {
    name: string;
    steps: string[];
    meal: Meal;
    imageUrl: string[];
    prepareTime: String;
}