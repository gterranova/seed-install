import { Routes } from '@angular/router';
// app
import { HomeComponent } from './components/home/home.component';
import { Config } from '../common/index';

export const HomeRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        component: HomeComponent,
        data: {
            title: 'Home',
            icon: 'menu',
            showAsPopupActionItem: false,
            showAsDrawerItem: true,
            actionBarHidden: false,
            actionItemsHidden: false,
            /*
            actions: [
                {
                    title: 'About',
                    icon: 'menu',
                    path: '/login',
                }
            ],
            */
        }
    },
    /*
    {
        path: 'settings', pathMatch: 'prefix',
        loadChildren: '~/app/settings/settings.module#SettingsModule',
        data: {
            title: 'Settings',
            icon: 'arrow_back',
            showAsPopupActionItem: true,
            showAsDrawerItem: true,
            actionBarHidden: false,
            actionItemsHidden: false,
        }
    }
    */
];
