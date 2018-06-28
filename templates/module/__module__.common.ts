// app
import { SharedModule } from '../shared';
import { {{properCase module-name}}RoutingModule } from "./{{dashCase module-name}}-routing.module";

export const SHARED_MODULES: any[] = [
    SharedModule,
    {{properCase module-name}}RoutingModule,
];

export const COMPONENT_DECLARATIONS: any[] = [
];
