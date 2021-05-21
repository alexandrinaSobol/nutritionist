import { Product } from './product.meal';

export class Meal {
  name: string;
  ingredients: Product[];
  weight: number;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  imageUrl: string;
  // 1 - mic dejun, 2 - pranz, 3 - cina
  category: number;
  recipe: string;
}