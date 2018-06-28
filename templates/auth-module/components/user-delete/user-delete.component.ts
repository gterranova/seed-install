import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['../common/styles.scss', './user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {
    result: string;
    password: string;

  constructor(
      private authenticationService: AuthenticationService,) { 
  }

  ngOnInit() {
  }

  canSubmit() {
      return !!this.password;   
  }

  submit() {
      this.authenticationService.userDelete(this.password)
          .subscribe( response => this.result = response, error => {
              this.result = Object.keys(error.error).map(function(key){
                  return error.error[key];
              }).toString();
          });      
  }

}
