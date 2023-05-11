import {Component, OnInit} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {SwUpdate} from "@angular/service-worker";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'pwa-project';
    openedPage = ''

    constructor(private update: SwUpdate) {
    }

    ngOnInit() {
        this.checkUpdate()
    }

    toggleSidenav(sidenav: MatSidenav) {
        sidenav.toggle()
    }

    onCloseSidenav(event: any, sidenav: MatSidenav) {
        if (event === true) {
            sidenav.close()
        }
    }

    checkUpdate() {
        this.update.checkForUpdate().then((canUpdate) => {
            if (canUpdate) {
                alert('There is a new version available!');
                window.location.reload();
            }
        });
    }
}
