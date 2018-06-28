import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'app-user-activate',
  templateUrl: './user-activate.component.html',
  styleUrls: ['../common/styles.scss', './user-activate.component.scss']
})
export class UserActivateComponent implements OnInit {
  uid: string;
  token: string;
  result: string;
  providedData: boolean;

  constructor(
      private route: ActivatedRoute,
      private authenticationService: AuthenticationService,) { 
  }

  ngOnInit() {
      this.route.params.subscribe( args => {
          this.uid = args['uid'];
          this.token = args['token'];
          this.providedData = !!this.uid && !!this.token;
      });
  }

  canSubmit() {
      return !!this.uid && !!this.token;   
  }

  submit() {
      this.authenticationService.userActivate(this.uid, this.token)
          .subscribe( response => this.result = response, error => {
              this.result = Object.keys(error.error).map(function(key){
                  return error.error[key];
              }).toString();
          });      
  }
}
