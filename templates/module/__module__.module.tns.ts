import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';

// app
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './{{ dashCase module-name }}.common';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ...SHARED_MODULES
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class {{properCase module-name}}Module {

    constructor( @Optional() @SkipSelf() parentModule: {{properCase module-name}}Module) {
        if (parentModule) {
            throw new Error('{{properCase module-name}}Module already loaded; Import in root module only.');
        }
    }
}