// app
import { RouterModule } from '../common';
import { RouterToolbarComponent } from './router-toolbar/router-toolbar.component';
import { RouteChangeService } from './route-change.service';
import { RouterDrawerContentComponent } from './router-drawer-content/router-drawer-content.component';

export const SHARED_MODULES: any[] = [
    RouterModule
];

export const COMPONENT_DECLARATIONS: any[] = [
    RouterToolbarComponent,
    RouterDrawerContentComponent
];

export const MODULE_EXPORTS: any[] = [
    RouterToolbarComponent,
    RouterDrawerContentComponent
];

export const MODULE_PROVIDERS: any[] = [
    RouteChangeService
];
