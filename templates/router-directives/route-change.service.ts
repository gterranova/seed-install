import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { zip, filter, map } from 'rxjs/operators';
import { RouterDrawerActions } from './router-drawer-content/router-drawer-actions.interface';

export interface MenuItem {
    path: string;
    title: string;
    hash?: string;
    navigationAction?: string;
    icon?: string;
    actions?: MenuItem[];
    showAsPopupActionItem?: boolean;
    showAsDrawerItem?: boolean;
    actionBarHidden?: boolean;
    actionItemsHidden?: boolean;
    menuItems?: MenuItem[];
    drawerItems?: MenuItem[];
}

@Injectable({
    providedIn: 'root'
})
export class RouteChangeService {

    activeMenuItem$: BehaviorSubject<MenuItem> = new BehaviorSubject<MenuItem>({ path: '', title: '', icon: '' });
    // loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    drawerHolder: RouterDrawerActions;

    constructor(private router: Router /*, private titleService: Title*/) {

        // router.events.subscribe((event: RouterEvent) => {
        //  this.navigationInterceptor(event)
        // })
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd),
            map(_ => this.router.routerState.root)
        ).subscribe(route => {
            let active = this.lastRouteWithMenuItem(route.root);
            if (!active) { active = this.activeMenuItem$.getValue(); }
            active.hash = active.hash || this.hash(active);
            // console.log('Active hash:', active, active.hash);
            // if (active && active.title) {
            //   this.titleService.setTitle(active.title);
            // }
            this.activeMenuItem$.next(active);
        });
    }

    /*
    get loading() {
        return this.loading$.asObservable();
    }
    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {
      if (event instanceof NavigationStart) {
          this.activeMenuItem$.next({path: '', title: '', icon: ''});
        this.loading$.next(true);
      }
      if (event instanceof NavigationEnd) {
          this.loading$.next(false);
      }

      // Set loading state to false in both of the below events to hide the spinner in case a request fails
      if (event instanceof NavigationCancel) {
          this.loading$.next(false);
      }
      if (event instanceof NavigationError) {
          this.loading$.next(false);
      }
    }
    */

    setDrawerHolder(drawerHolder: RouterDrawerActions) {
        this.drawerHolder = drawerHolder;
    }

    get activeMenuItem() {
        return this.activeMenuItem$.asObservable();
    }

    set activeMenuItem(menu: any) {
        this.activeMenuItem$.next(menu);
    }

    get title() {
        return this.activeMenuItem$.getValue().title;
    }
    set title(title: string) {
        const active = this.activeMenuItem$.getValue();
        active.title = title;
        console.log('Change title to:', title);
        this.activeMenuItem$.next(active);
    }

    getMenuItems(): MenuItem[] {
        return this.router.config
            // only add a menu item for routes with a title set.
            .filter(route => {
                const hash = this.hash(route.data);
                return route.data &&
                    route.data.title &&
                    !!route.data.showAsPopupActionItem &&
                    hash !== this.activeMenuItem$.getValue().hash;
            })
            .map(route => {
                return <MenuItem>Object.assign({ path: route.path }, route.data);
            });
    }

    getDrawerItems(): MenuItem[] {
        return this.router.config
            // only add a menu item for routes with a title set.
            .filter(route => route.data && route.data.title && !!route.data.showAsDrawerItem)
            .map(route => {
                return <MenuItem>Object.assign({ path: route.path }, route.data);
            });
    }

    onDrawerButtonTap(drawerItem: MenuItem): boolean {
        this.router.navigate(['/' + drawerItem.path]);
        if (this.drawerHolder) {
            this.drawerHolder.closeDrawer();
        }
        return false;
    }

    onToolbarButtonTap(toolbarItem: MenuItem): boolean {
        this.router.navigate(['/' + toolbarItem.path]);
        if (this.drawerHolder) {
            this.drawerHolder.closeDrawer();
        }
        return false;
    }

    onNavButtonTap(navItem: MenuItem): void {
        if (navItem.navigationAction === 'menu') {
            if (this.drawerHolder) {
                this.drawerHolder.toggleDrawer();
            }
        }
    }

    private lastRouteWithMenuItem(route: ActivatedRoute): MenuItem {
        let lastMenu: MenuItem;
        do { lastMenu = this.extractMenu(route) || lastMenu; }
        while ((route = route.firstChild));
        return <MenuItem>Object.assign({ path: lastMenu.path }, lastMenu);
    }

    private extractMenu(route: ActivatedRoute): MenuItem {
        const cfg = route.routeConfig;
        return cfg && cfg.data
            ? <MenuItem>cfg.data
            : undefined;
    }

    private hash(s) {
        if (!s) {
            return '';
        }
        s = JSON.stringify(s);
        /* Simple hash function. */
        let a = 1, c = 0, h, o;
        if (s) {
            a = 0;
            /*jshint plusplus:false bitwise:false*/
            for (h = s.length - 1; h >= 0; h--) {
                o = s.charCodeAt(h);
                // tslint:disable-next-line:no-bitwise
                a = (a << 6 & 268435455) + o + (o << 14);
                // tslint:disable-next-line:no-bitwise
                c = a & 266338304;
                // tslint:disable-next-line:no-bitwise
                a = c !== 0 ? a ^ c >> 21 : a;
            }
        }
        return String(a);
    }
}
