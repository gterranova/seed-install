import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { SHARED_MODULES, COMPONENT_DECLARATIONS, COMPONENT_PROVIDERS } from './auth.common';

import { MaterialModule } from '../material.module';

import { ForgotPasswordDialog } from './components/login/login.component';


@NgModule({
    imports: [
        MaterialModule,
        ...SHARED_MODULES,
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS,
        ForgotPasswordDialog,
    ],
    entryComponents: [
      ForgotPasswordDialog
    ],
    providers: [
      ...COMPONENT_PROVIDERS
    ]
})
export class AuthModule { 
  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('AuthModule is already loaded. It should only be imported in your application\'s main module.');
    }
  }
}
