import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { RouteChangeService, MenuItem } from '../route-change.service';

@Component({
    moduleId: module.id,
    selector: 'app-router-toolbar',
    templateUrl: './router-toolbar.component.html'
})
export class RouterToolbarComponent implements OnInit {
    toolbarItems: MenuItem[];
    activeMenuItem$: Observable<MenuItem>;

    constructor(private location: Location,
        private menuService: RouteChangeService) {
        this.activeMenuItem$ = menuService.activeMenuItem;
        this.activeMenuItem$.subscribe((active) => {
            this.toolbarItems = (!!active.actionItemsHidden) ? [] :
                menuService.getMenuItems().filter(item => item.path !== active.path);
        });
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onToolbarButtonTap(toolbarItem: MenuItem, event): void {
        this.menuService.onToolbarButtonTap(toolbarItem);
    }

    onNavButtonTap(active: MenuItem, event): void {
        event.target.blur();
        if (active.navigationAction === 'menu') {
            this.menuService.onNavButtonTap(active);
        } else {
            this.location.back();
        }
    }
}
