import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'answer-me';
  isAuthenticated: boolean;
  user : User = new User();

  constructor(public oktaAuth: OktaAuthService) {
  }

  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    const accessToken = await this.oktaAuth.getAccessToken();
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
    this.user = userClaims;
    console.log(this.user);
    console.log(accessToken);
  }
}
