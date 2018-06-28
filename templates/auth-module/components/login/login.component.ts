import {Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { AuthenticationService } from '../../services';
import { BaseLoginComponent, User } from './base-login.component';

@Component({
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ['../common/styles.scss', './login.component.scss']
})

export class LoginComponent extends BaseLoginComponent implements OnInit {
 
    constructor(
        public dialog: MatDialog,
        protected authenticationService: AuthenticationService,
        protected router: Router) { 
        super(authenticationService, router);
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    prompt(data: any): Promise<any> {
        let dialogRef = this.dialog.open(ForgotPasswordDialog, {
          width: '300px',
          data: data
        });

        return dialogRef.afterClosed().toPromise();
    }

    alert(message: string) { 
        this.error = message;
    }
}

@Component({
    moduleId: module.id,
    selector: 'forgot-password-dialog',
    templateUrl: './forgot-password.dialog.html',
})
export class ForgotPasswordDialog {
  email: string;

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.email = data.defaultText;
  }

  onNoClick(): void {
    this.dialogRef.close({result: false});
  }

}