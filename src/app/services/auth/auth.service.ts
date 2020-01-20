import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService, private _cookieService: CookieService) { }

  registerUser(user) {

  }

  logInUser(user) {

  }

  //this flag is used in auth guard to authenticate the route
  //calls the server
  isLoggedIn(): boolean {
   // return !!localStorage.getItem('token');
   // return false;
   return this.http.checkIfUserIsLoggedIn()
  }

  //checkes the local storage and sends the json of the value
  isAuthenticated() {
    console.log('Auth Service');
    return JSON.parse(sessionStorage.getItem('Authenticated')) ;
  }

}
