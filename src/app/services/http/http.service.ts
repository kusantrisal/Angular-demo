import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private _baseUrl = "http://localhost:9090/test";
  private loginUrl: string = "http://localhost:9090/login";
  isAuthenticated:boolean = false;

  logIn( data: any) {
    const body = new HttpParams()
    .set('username', data.username)
    .set('password', data.password);

    const corsOptions = {
      origin: 'http://localhost:4200',
      credentials: true,
  
  }
    return this.http.post(this.loginUrl, body, {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'), withCredentials: true, responseType: 'json'});
   // return this.http.post<any>(this._baseUrl, data, { responseType: "json" });
  }

  checkIfUserIsLoggedIn(): boolean {
     this.http.get<boolean>("http://localhost:9090/securedEndpoint").subscribe(res => this.isAuthenticated =  res, err => console.error(err) );
     console.log("Checking if user is authenticated authenticated: " + this.isAuthenticated)
     return this.isAuthenticated;
  }
  

}
