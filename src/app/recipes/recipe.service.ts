import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Gazpacho',
      'Spanish cold soup',
      'http://3.bp.blogspot.com/_h2EzbV4lTjA/SOO3STI0Q1I/AAAAAAAABdg/PXwz2JfjTDk/s400/Copy+of+gazpacho+3.JPG',
      [
        new Ingredient('Tomato', 10),
        new Ingredient('Onios', 3),
        new Ingredient('Garlic', 1),
        new Ingredient('cucumber', 2),
        new Ingredient('Parsil', 1)
      ]),
    new Recipe('Thai green curry',
      'My favourite dish',
      'https://static1.squarespace.com/static/50106d5684aed4702b7242ed/t/530a60e0e4b0dbc78d16cbdf/1432352707452/ThaiGreenCurry.jpg',
      [
        new Ingredient('Thai green curry paste', 1),
        new Ingredient('Onion', 2),
        new Ingredient('Chicken', 2),
        new Ingredient('Green peper', 1),
        new Ingredient('Chilles', 2)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
