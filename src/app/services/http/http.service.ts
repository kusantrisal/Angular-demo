import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IUser } from "src/app/models/user";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private _baseUrl = environment.baseUrl;

  getRequest(param): Observable<any> {
    var url = this._baseUrl + "/" + param;
    console.debug("Get rquest to :" + url);
    return this.http.get<IUser[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.message || "server error");
      })
    );
  }

  postRequest(formValue): Observable<any> {
    var url = this._baseUrl + "/addUser"; 
    console.debug("Post rquest to :" + url);
    return this.http.post<any>(url, formValue, { responseType: "json" });
  }
}
