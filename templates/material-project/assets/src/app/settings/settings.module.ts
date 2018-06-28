import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';

// app
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './settings.common';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
    imports: [
        ...SHARED_MODULES
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS,
        SettingsComponent,
    ],
    exports: [
        ...COMPONENT_DECLARATIONS,
        SettingsComponent,
    ],
})
export class SettingsModule {
}
