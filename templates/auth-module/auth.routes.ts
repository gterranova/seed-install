import { Routes } from '@angular/router';
// app
import { AuthGuard } from './guards';
import { LoginComponent } from './components/login/login.component';
/*
import { PasswordResetConfirmComponent } from './components/password-reset-confirm/password-reset-confirm.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import { ChangeUsernameComponent } from './components/change-username/change-username.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserActivateComponent } from './components/user-activate/user-activate.component';
*/

export const AuthRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login' },
    {
        path: 'login', 
        component: LoginComponent,
        data: {
            title: 'Login',
            icon: 'arrow_back',            
            showAsPopupActionItem: false,
            showAsDrawerItem: true,
            actionBarHidden: false,
            actionItemsHidden: false,
        }
    },
    /*
    {
        path: 'password-reset/confirm', 
        children: [
            { 
                path: '', 
                pathMatch: 'full',
                component: PasswordResetConfirmComponent,
                data: {
                    title: 'Password Reset Confirm',
                    showAsPopupActionItem: false,
                    actionBarHidden: true,
                    actionItemsHidden: true,
                }
            },
            { 
                path: ':uid/:token', 
                component: PasswordResetConfirmComponent,
                data: {
                    title: 'Password Reset Confirm',
                    showAsPopupActionItem: false,
                    actionBarHidden: true,
                    actionItemsHidden: true,
                }
            },
        ]
    },
    {
        path: 'user-activate', 
        children: [
            { 
                path: '', 
                pathMatch: 'full',
                component: UserActivateComponent,
                data: {
                    title: 'User Activate',
                    showAsPopupActionItem: false,
                    actionBarHidden: true,
                    actionItemsHidden: true,
                }
            },
            { 
                path: ':uid/:token', 
                component: UserActivateComponent,
                data: {
                    title: 'User Activate',
                    showAsPopupActionItem: false,
                    actionBarHidden: true,
                    actionItemsHidden: true,
                }
            },
        ]
    },
    {
        path: 'user-delete', 
        component: UserDeleteComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'User Delete',
            icon: 'arrow_back',
            showAsPopupActionItem: false,
            actionBarHidden: false,
            actionItemsHidden: true,
        }
    },
    {
        path: 'change-username', 
        component: ChangeUsernameComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Change Email',
            icon: 'arrow_back',
            showAsPopupActionItem: false,
            actionBarHidden: false,
            actionItemsHidden: true,
        }
    },
    {
        path: 'change-password', 
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Change Password',
            icon: 'arrow_back',
            showAsPopupActionItem: false,
            actionBarHidden: false,
            actionItemsHidden: true,
        }
    },
    */
];
