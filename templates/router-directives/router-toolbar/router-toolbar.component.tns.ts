import { Component, OnInit, Input } from "@angular/core";
// import { Location } from '@angular/common';
import { RouterExtensions } from "nativescript-angular/router";
import { Observable } from 'rxjs';
import { RouteChangeService, MenuItem } from '../route-change.service';
// Android
import { Page } from "tns-core-modules/ui/page";

@Component({
    moduleId: module.id,
    selector: 'app-router-toolbar',
    templateUrl: './router-toolbar.component.html',
})
export class RouterToolbarComponent {

    toolbarItems: MenuItem[];
    activeMenuItem$: Observable<MenuItem>;

    constructor(
        private page: Page,
        private router: RouterExtensions,
        private menuService: RouteChangeService) {
        this.activeMenuItem$ = menuService.activeMenuItem;
        this.activeMenuItem$.subscribe( (active) => {
            this.page.actionBarHidden = !!active.actionBarHidden;
            this.toolbarItems = (!!active.actionItemsHidden) ? [] : menuService.getMenuItems().filter(item => item.path != active.path)
        });
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onToolbarButtonTap(toolbarItem: MenuItem): void {
        this.menuService.onToolbarButtonTap(toolbarItem);
    }

    onNavButtonTap(active: MenuItem): void {
        if (active.navigationAction == 'menu') {
            this.menuService.onNavButtonTap(active);
        } else {
            this.router.backToPreviousPage();
        }
    }

}
