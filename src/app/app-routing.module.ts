import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from "./Views/main/main.component";
import { CarsComponent } from "./Views/cars/cars.component";
import { FavoritesComponent } from "./Views/favorites/favorites.component";
import { NotFoundComponent } from "./Views/not-found/not-found.component";

const routes: Routes = [
    {
        path: 'main',
        component: MainComponent
    },
    {
        path: 'cars',
        component: CarsComponent
    },
    {
        path: 'favorites',
        component: FavoritesComponent
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
