import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor ,  HttpRequest,
  HttpHandler,
  HttpEvent,HttpHeaders} from '@angular/common/http';
 
import { AuthService } from "../auth/auth.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
    let requestTokenized = request.clone({
      withCredentials: true
    })

    console.log("Out going request is intercepted.");
    console.log('TokenInterceptorService: ' + JSON.parse(JSON.stringify(request)) );
    
    return next.handle(requestTokenized);
  }
}
