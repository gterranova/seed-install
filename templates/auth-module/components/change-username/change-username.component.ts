import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['../common/styles.scss', './change-username.component.scss']
})
export class ChangeUsernameComponent implements OnInit {
    result: string;
    new_email: string;
    current_password: string;

  constructor(
      private authenticationService: AuthenticationService,) { 
  }

  ngOnInit() {
  }

  canSubmit() {
      return !!this.new_email && !!this.current_password;   
  }

  submit() {
      this.authenticationService.userSetEmail(this.new_email, this.current_password)
          .subscribe( response => this.result = response, error => {
              this.result = Object.keys(error.error).map(function(key){
                  return error.error[key];
              }).toString();
          });      
  }

}
