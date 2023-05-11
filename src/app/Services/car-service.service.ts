import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { CarsResponse } from "../Models/CarsResponse";
import { Car } from "../Models/Car"

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CarServiceService {

    private _cars$ = new BehaviorSubject<Car[]>([])
    readonly cars$ = this._cars$.asObservable()

    private _carsLoaded = false;

    constructor(private http: HttpClient) { }

    async getCars() {
        if (!this._carsLoaded) {
            this.http.get<CarsResponse>("http://cars.anton.local/cars")
                .subscribe((response: CarsResponse) => {
                    if (response.success) {
                        console.log(`${response.cars.length} cars are downloaded`)
                        this._cars$.next(response.cars)
                        this._carsLoaded = true;
                    } else {
                        console.log(response.success, response.message)
                    }
                })
        } else {
            console.log("Cars are already loaded!")
        }
    }

    get carsLoaded(): boolean {
        return this._carsLoaded;
    }
}
