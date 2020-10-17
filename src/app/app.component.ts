import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { User } from './models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'answer-me';
  isAuthenticated: boolean;
  user : User = new User();
  apiUser: string = "http://localhost:8080/user/save/";

  constructor(public oktaAuth: OktaAuthService, public http: HttpClient) {
  }

  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    const accessToken = await this.oktaAuth.getAccessToken();
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
    this.user.familyName = userClaims.family_name;
    this.user.givenName = userClaims.given_name;
    this.user.name = userClaims.name;
    this.user.preferredUsername = userClaims.preferred_username;
    this.user.sub = userClaims.sub;
    console.log(this.user);
    console.log(accessToken);

    await this.http.post<User>(this.apiUser, this.user).subscribe(res => console.log(res));

  }
}
