import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { RouterDrawerActions } from './router-directives/router-drawer-content/router-drawer-actions.interface';
import { RouteChangeService } from './router-directives/route-change.service';

// vendor dependencies
// app

declare const require: any;

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit, RouterDrawerActions {
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private menuService: RouteChangeService,
        private _changeDetectionRef: ChangeDetectorRef) { }

    @ViewChild('sidedrawerId') public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngOnInit() {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    ngAfterViewInit() {
        // fairly certain this statement is never entered
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
        this.menuService.setDrawerHolder(this);
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    openDrawer() {
        this.drawer.showDrawer();
    }

    closeDrawer() {
        this.drawer.closeDrawer();
    }

    toggleDrawer() {
        this.drawer.toggleDrawerState();
    }
}
