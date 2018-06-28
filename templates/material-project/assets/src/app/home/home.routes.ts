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
            navigationAction: 'menu',
            icon: 'home',
            showAsPopupActionItem: false,
            showAsDrawerItem: true,
            actions: [
                {
                  title: 'Settings',
                  icon: 'cog',
                  path: '/settings',
                }
            ],
            actionBarHidden: false,
            actionItemsHidden: false,
        }
    },
    { path: 'settings', pathMatch: 'prefix',
        loadChildren: '~/app/settings/settings.module#SettingsModule',
        data: {
            title: 'Settings',
            navigationAction: 'arrow_back',
            icon: 'cog',
            showAsPopupActionItem: true,
            showAsDrawerItem: true,
            actionBarHidden: false,
            actionItemsHidden: false,
        }
    }
];
