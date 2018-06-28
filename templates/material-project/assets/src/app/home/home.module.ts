import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';
// app
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './home.common';

@NgModule({
    imports: [
        ...SHARED_MODULES
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS
    ]
})
export class HomeModule {

    constructor(@Optional() @SkipSelf() parentModule: HomeModule) {
        if (parentModule) {
            throw new Error('HomeModule already loaded; Import in root module only.');
        }
    }

}
