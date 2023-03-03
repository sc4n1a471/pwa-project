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

    constructor(private http: HttpClient) { }

    async getCars() {
        this.http.get<CarsResponse>("http://cars.anton.local/cars")
            .subscribe((response: CarsResponse) => {
                if (response.success) {
                    this._cars$.next(response.cars)
                } else {
                    console.log(response.success, response.message)
                }
            })
    }
}
