import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";

import { AuthenticationService } from "../../services/authentication.service";
import { BaseLoginComponent, User } from './base-login.component';

@Component({
    moduleId: module.id,
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ['../common/styles.scss', './login.component.scss']
})
export class LoginComponent extends BaseLoginComponent {

    constructor(
        protected authenticationService: AuthenticationService,
        protected router: Router) { 
        super(authenticationService, router);
    }

    alert(message: string) {
        return alert({
            title: this.app_name,
            okButtonText: "OK",
            message: message
        });
    }

    prompt(data: any) {
        return prompt(data);
    }
}

