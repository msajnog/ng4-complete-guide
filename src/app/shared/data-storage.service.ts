import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storageRecipes() {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer asdfasdgasgasd');

    // return this.httpClient.put('https://ng-recipe-book-d00e0.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    //   // headers: headers
    // });
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-d00e0.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true});
    return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();

    // return this.httpClient.get<Recipe[]>('https://ng-recipe-book-d00e0.firebaseio.com/recipes.json?auth=' + token)
    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-d00e0.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json',
    })
      .map(
        (recipes) => {
          console.log('recipes', recipes);
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
