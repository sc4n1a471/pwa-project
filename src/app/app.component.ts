import { Component } from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'pwa-project';
    openedPage = ''

    toggleSidenav(sidenav: MatSidenav) {
        sidenav.toggle()
    }

    onCloseSidenav(event: any, sidenav: MatSidenav) {
        if (event === true) {
            sidenav.close()
        }
    }
}
