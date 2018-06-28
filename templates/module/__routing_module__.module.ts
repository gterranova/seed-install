import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { RouterModule } from '../common';

const routes: Routes = [
    // { path: "", component: {{properCase module-name}}Component }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class {{properCase module-name}}RoutingModule { }
