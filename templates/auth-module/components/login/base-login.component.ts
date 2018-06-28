import { ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { Config } from '../../../common';

export class User {
    email: string;
    password: string;
    confirmPassword: string;
}

export abstract class BaseLoginComponent {
    isLoggingIn = true;
    loading = false;
    error = '';
    user: User;
    app_name: string;

    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;

    constructor(protected authService: AuthenticationService, protected router: Router) {
        this.user = new User();
        this.user.email = "admin";
        this.user.password = "terranova$1";
        this.app_name = Config.APP_NAME;
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (!this.user.email || !this.user.password) {
            this.alert("Please provide both an email address and password.");
            return;
        }

        if (this.isLoggingIn) {
            this.login();
        } else {
            this.register();
        }
    }

    login() {
        this.authService.login(this.user.email, this.user.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                }
            }, error => {
                this.alert('Email or password is incorrect');
                this.loading = false;
            });
    }

    register() {
        if (this.user.password != this.user.confirmPassword) {
            this.alert("Your passwords do not match.");
            return;
        }
        this.authService.userCreate(this.user.email, this.user.password)
            .toPromise().then(() => {
                this.alert("Your account was successfully created.");
                this.isLoggingIn = true;
            })
            .catch(() => {
                this.alert("Unfortunately we were unable to create your account.");
            });
    }

    forgotPassword() {
        this.prompt({
            title: "Forgot Password",
            message: `Enter the email address you used to register for ${this.app_name} to reset your password.`,
            inputType: "email",
            defaultText: this.user.email,
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then((data) => {
            if (data && data.result) {
                this.authService.userPasswordReset(data.text.trim())
                    .toPromise().then(() => {
                        this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                    }).catch(() => {
                        this.alert("Unfortunately, an error occurred resetting your password.");
                    });
            }
        });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }

    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }

    canSubmit() {
        return !!this.user.email && !!this.user.password && (this.isLoggingIn || this.user.password==this.user.confirmPassword);   
    }

    navigate(url: string) {
        this.router.navigate([url]);
    }

    abstract prompt(data: any) : Promise<any>;
    abstract alert(message: string) : void;
}
