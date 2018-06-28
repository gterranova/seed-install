import { Routes } from '@angular/router';
// app
import { Config } from '../common/index';
import { SettingsComponent } from './components/settings/settings.component';

const basePath = Config.IS_WEB ? '' : './';

export const SettingsRoutes: Routes = [
    { path: '', component: SettingsComponent }
];
