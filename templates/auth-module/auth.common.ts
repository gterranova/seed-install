// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { AuthRoutes } from './auth.routes';
import { LoginComponent } from './components/login/login.component';

import { PasswordResetConfirmComponent } from './components/password-reset-confirm/password-reset-confirm.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import { ChangeUsernameComponent } from './components/change-username/change-username.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserActivateComponent } from './components/user-activate/user-activate.component';

import { AuthGuard } from './guards';
import { AuthenticationService, ApiService, TokenService } from './services';
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

export function jwtOptionsFactory(tokenService: TokenService) {
  return {
    tokenGetter: () => {
      return tokenService.token;
    },
    whitelistedDomains: ['localhost:8000', '192.168.1.132:8000'],
    blacklistedRoutes: [],
    authScheme: 'JWT ',
  }
}

export const SHARED_MODULES: any[] = [
    SharedModule,
    RouterModule.forChild(<any>AuthRoutes),
    TranslateModule.forChild(),
    JwtModule.forRoot({
        jwtOptionsProvider: {
            provide: JWT_OPTIONS,
            useFactory: jwtOptionsFactory,
            deps: [TokenService]
        }
    }), 
];

export const COMPONENT_DECLARATIONS: any[] = [
    LoginComponent,
    PasswordResetConfirmComponent,
    UserDeleteComponent,
    ChangeUsernameComponent,
    ChangePasswordComponent,
    UserActivateComponent
];

export const COMPONENT_PROVIDERS: any[] = [
    JwtHelperService,
    AuthGuard,
    AuthenticationService,
    ApiService,
    TokenService,
];