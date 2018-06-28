import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';

// app
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './settings.common';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ...SHARED_MODULES
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS,
        SettingsComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})
export class SettingsModule {

    constructor( @Optional() @SkipSelf() parentModule: SettingsModule) {
        if (parentModule) {
            throw new Error('SettingsModule already loaded; Import in root module only.');
        }
    }
}