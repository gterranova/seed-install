import { NgModule, ModuleWithProviders, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '../common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
// app
import { SHARED_MODULES, COMPONENT_DECLARATIONS, MODULE_EXPORTS } from './router-directives.common';
import { MODULE_PROVIDERS } from './router-directives.common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ...SHARED_MODULES,
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS,
    ],
    exports: [
        ...MODULE_EXPORTS
    ],
})
export class RouterDirectivesModule {
    static forRoot(): ModuleWithProviders {
        return {
          ngModule: RouterDirectivesModule,
          providers: [ ...MODULE_PROVIDERS ]
        };
      }
}
