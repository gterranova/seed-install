// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { SettingsRoutes } from './settings.routes';
import { RouterDirectivesModule } from '../router-directives/router-directives.module';

export const SHARED_MODULES: any[] = [
    SharedModule,
    RouterModule.forChild(<any>SettingsRoutes),
    RouterDirectivesModule
];

export const COMPONENT_DECLARATIONS: any[] = [
];
