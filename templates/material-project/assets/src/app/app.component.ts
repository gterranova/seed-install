import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RouterDrawerActions } from './router-directives/router-drawer-content/router-drawer-actions.interface';
import { MatSidenav } from '@angular/material/sidenav';
import { RouteChangeService } from './router-directives/route-change.service';
// vendor dependencies
// app

declare const require: any;

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, RouterDrawerActions {

    @ViewChild('sidedrawerId') public drawer: MatSidenav;

    constructor(private menuService: RouteChangeService) { }

    ngOnInit() {
        this.menuService.setDrawerHolder(this);
    }

    openDrawer() {
        this.drawer.open();
    }

    closeDrawer() {
        this.drawer.close();
    }

    toggleDrawer() {
        this.drawer.toggle();
    }
}
