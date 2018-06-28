import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../common/styles.scss', './change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    result: string;
    new_password: string;
    current_password: string;

  constructor(
      private authenticationService: AuthenticationService,) { 
  }

  ngOnInit() {
  }

  canSubmit() {
      return !!this.new_password && !!this.current_password;   
  }

  submit() {
      this.authenticationService.userSetPassword(this.new_password, this.current_password)
          .subscribe( response => this.result = response, error => {
              this.result = Object.keys(error.error).map(function(key){
                  return error.error[key];
              }).toString();
          });      
  }

}
