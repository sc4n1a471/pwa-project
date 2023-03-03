import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { NavComponent } from './nav/nav.component';
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MainComponent } from './Views/main/main.component';
import { CarsComponent } from './Views/cars/cars.component';
import { FavoritesComponent } from './Views/favorites/favorites.component';
import { NotFoundComponent } from './Views/not-found/not-found.component';
import { HttpClientModule} from "@angular/common/http";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        MainComponent,
        CarsComponent,
        FavoritesComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatExpansionModule,
        MatCardModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
