import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Config } from '../../../common';

@Component({
  moduleId: module.id,
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['../common/styles.scss', './password-reset-confirm.component.scss']
})
export class PasswordResetConfirmComponent implements OnInit {
  app_name: string = Config.APP_NAME;
  uid: string;
  token: string;
  providedData: boolean = false;
  
  password: string;
  password2: string;
  result: string;

  constructor(
      private route: ActivatedRoute,
      private authenticationService: AuthenticationService,) { 
  }

  ngOnInit() {
      this.route.params.subscribe( args => {
          this.uid = args['uid']||'';
          this.token = args['token']||'';
          this.providedData = !!this.uid && !!this.token;
      });
  }

  canSubmit() {
      return !!this.uid && !!this.token && !!this.password && !!this.password2 && this.password==this.password2;   
  }

  submit() {
      this.authenticationService.userPasswordResetConfirm(this.uid, this.password, this.token)
          .subscribe( response => this.result = response, error => {
              this.result = Object.keys(error.error).map(function(key){
                  return error.error[key];
              }).toString();
          });      
  }
}
