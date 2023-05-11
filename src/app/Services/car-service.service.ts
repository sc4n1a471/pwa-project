import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CarsResponse } from "../Models/CarsResponse";
import { Car } from "../Models/Car"

import {BehaviorSubject, Observable, startWith, Subject, switchMap} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CarServiceService {
    private readonly update$ = new Subject<void>();

    private _cars$ = new BehaviorSubject<Car[]>([])
    readonly cars$ = this._cars$.asObservable()

    private _db$ = new Subject<IDBDatabase>()
    private db$ = this._db$.asObservable()

    private _favoriteCars$ = new BehaviorSubject<Car[]>([])
    favoriteCars$ = this._favoriteCars$.asObservable()

    private _carsLoaded = false;

    constructor(private http: HttpClient) {
        this.loadFavoriteCars()
    }

    createDb(db: IDBDatabase): void {
        db.createObjectStore("favoriteCars", { keyPath: "license_plate" });
        console.log("create", db);
    }

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

    async loadFavoriteCars() {
        console.log('he')
        this.db$ = new Observable<IDBDatabase>((observer) => {
            const openRequest = indexedDB.open('carsDB');
            openRequest.onupgradeneeded = () => this.createDb(openRequest.result);
            openRequest.onsuccess = () => {
                observer.next(openRequest.result);
                observer.complete();
            };
        });
        console.log('he2')

        this.favoriteCars$ = this.update$.pipe(
            startWith(undefined),
            switchMap(() =>
                this.db$!.pipe(
                    switchMap(
                        (db) =>
                            new Observable<Car[]>((observer) => {
                                console.log('Querying favorite cars...')
                                let transaction: IDBTransaction | null =
                                    db.transaction('favoriteCars');
                                const request = transaction.objectStore('favoriteCars').getAll();
                                transaction.oncomplete = () => {
                                    console.log(request.result)
                                    transaction = null;
                                    observer.next(request.result as Car[]);
                                    observer.complete();
                                };
                            })
                    )
                )
            )
        );
    }

    async uploadCar(car: Car) {
        this.db$
            .pipe(
                switchMap(
                    (db) =>
                        new Observable((observer) => {
                            let transaction = db.transaction("favoriteCars", "readwrite");
                            transaction.objectStore("favoriteCars")
                                .add(car);
                            transaction.oncomplete = () => {
                                console.log(`${car.license_plate} was saved successfully!`)
                                this.update$.next();
                                observer.complete();
                            };
                            return () => transaction?.abort();
                        })
                )
            ).subscribe();
    }

    async deleteFavoriteCar(car: Car) {
        this.db$
            .pipe(
                switchMap(
                    (db) =>
                        new Observable((observer) => {
                            let transaction: IDBTransaction | null = db.transaction(
                                'favoriteCars',
                                'readwrite'
                            );
                            transaction.objectStore('favoriteCars').delete(car.license_plate);
                            transaction.oncomplete = () => {
                                transaction = null;
                                this.update$.next();
                                observer.complete();
                            };
                            return () => transaction?.abort();
                        })
                )
            )
            .subscribe();
    }

    public clearFavoriteCars(): void {
        this.db$
            .pipe(
                switchMap(
                    (db) =>
                        new Observable((observer) => {
                            let transaction: IDBTransaction | null = db.transaction(
                                'favoriteCars',
                                'readwrite'
                            );
                            transaction.objectStore('favoriteCars').clear();

                            transaction.oncomplete = () => {
                                transaction = null;
                                this.update$.next();
                                observer.complete();
                            };
                            return () => transaction?.abort();
                        })
                )
            )
            .subscribe();
    }
}
