import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NgModule, ModuleWithProviders, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';

// app
import { SHARED_MODULES, COMPONENT_DECLARATIONS, MODULE_PROVIDERS, MODULE_EXPORTS } from './router-directives.common';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        TNSFontIconModule,
        ...SHARED_MODULES
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS,
    ],
    exports: [
        ...MODULE_EXPORTS
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RouterDirectivesModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RouterDirectivesModule,
            providers: [...MODULE_PROVIDERS]
        };
    }

}
