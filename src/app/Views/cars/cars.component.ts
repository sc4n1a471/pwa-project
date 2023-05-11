import {Component, OnInit} from '@angular/core';
import {CarServiceService} from "../../Services/car-service.service";
import {Car} from "../../Models/Car";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

    cars$ = this.carService.cars$

    isExpansionOpen = false

    constructor(private carService: CarServiceService) {}

    ngOnInit() {
        this.carService.getCars()
    }

    onCollapse() {
        this.isExpansionOpen = !this.isExpansionOpen
    }

    async addToFav(car: Car) {
        await this.carService.uploadCar(car)
    }
}
