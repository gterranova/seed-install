import { NgModule, ModuleWithProviders, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SHARED_MODULES, COMPONENT_DECLARATIONS, COMPONENT_PROVIDERS } from './auth.common';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ...SHARED_MODULES,
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS
    ],
    providers: [
      ...COMPONENT_PROVIDERS
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AuthModule { 
  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('AuthModule is already loaded. It should only be imported in your application\'s main module.');
    }
  }
}
