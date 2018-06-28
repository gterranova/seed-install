import { AppRoutingModule } from './app-routing.module';
// demo
import { HomeModule } from './home/home.module';
import { RouterDirectivesModule } from './router-directives/router-directives.module';

export const SHARED_MODULES: any[] = [
    AppRoutingModule,
    RouterDirectivesModule.forRoot(),
    HomeModule
];

export const SHARED_EXPORTS: any[] = [
    RouterDirectivesModule
];

export * from './app-routing.module';
