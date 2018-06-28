// vendor dependencies
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { HomeRoutes } from './home.routes';
import { HomeComponent } from './components/home/home.component';
import { RouterDirectivesModule } from '../router-directives/router-directives.module';

export const SHARED_MODULES: any[] = [
    SharedModule,
    RouterModule.forChild(<any>HomeRoutes),
    RouterDirectivesModule
];

export const COMPONENT_DECLARATIONS: any[] = [
    HomeComponent
];
