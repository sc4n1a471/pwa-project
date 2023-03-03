import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    @Input() currentPage: string = ''
    @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter()
    @Output() loggedOut = new EventEmitter()

    constructor() { }

    ngOnInit(): void {

    }

    close() {
        this.onCloseSidenav.emit(true)
    }
}
