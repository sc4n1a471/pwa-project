import {Car} from "./Car";

export type CarsResponse = {
    success: string,
    message: string,
    cars: [Car]
}
