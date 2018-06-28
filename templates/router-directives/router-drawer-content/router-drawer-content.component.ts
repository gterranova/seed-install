import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteChangeService, MenuItem } from '../route-change.service';

@Component({
    moduleId: module.id,
    selector: 'app-router-drawer-content',
    templateUrl: './router-drawer-content.component.html',
    styleUrls: ['./router-drawer-content.component.scss']
})
export class RouterDrawerContentComponent implements OnInit {

    drawerItems: MenuItem[];
    activeMenuItem$: Observable<MenuItem>;

    constructor(private menuService: RouteChangeService) {
        this.activeMenuItem$ = menuService.activeMenuItem;
        this.activeMenuItem$.subscribe((active) => {
            this.drawerItems = (!!active.actionItemsHidden) ? [] :
                menuService.getDrawerItems();
        });
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(drawerItem: MenuItem): void {
        this.menuService.onDrawerButtonTap(drawerItem);
    }

}
