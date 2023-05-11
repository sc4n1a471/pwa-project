import {Component, OnInit} from '@angular/core';
import {CarServiceService} from "../../Services/car-service.service";
import {Observable, startWith, Subject, switchMap} from "rxjs";
import {Car} from "../../Models/Car";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

    favoriteCars$ = this.carService.favoriteCars$

    isExpansionOpen = false

    constructor(private carService: CarServiceService) {}

    ngOnInit() {}

    onCollapse() {
        this.isExpansionOpen = !this.isExpansionOpen
    }

    deleteFavoriteCar(car: Car) {
        this.carService.deleteFavoriteCar(car)
    }

    clearFavoriteCars() {
        this.carService.clearFavoriteCars();
    }
}
