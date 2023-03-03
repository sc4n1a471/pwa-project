import {Component, OnInit} from '@angular/core';
import {CarServiceService} from "../../Services/car-service.service";
import {Car} from "../../Models/Car";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

    cars$ = this.carService.cars$

    isExpansionOpen = false

    constructor(
        private carService: CarServiceService
    ) {
    }

    async ngOnInit() {
        await this.carService.getCars()
    }

    onCollapse() {
        this.isExpansionOpen = !this.isExpansionOpen
    }

    addToFav(car: Car) {
        console.log("Selected car: ", car)
    }
}
