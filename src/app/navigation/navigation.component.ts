import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationComponent, LoggedInEvent } from '../authentication/authentication.component';
import { InteractionService } from '../services/interaction/interaction.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  
  isAutheticated;
  constructor(private _authenticationComponent:AuthenticationComponent,  
    private _authService: AuthService, 
    private _router: Router, 
    private _cookieService:CookieService,
    private _interactionService: InteractionService) {
    
  this._authenticationComponent.currentLoggedInStatus.subscribe(
    this.isAutheticated =  this._authService.isAuthenticated()
  )
   }

ngOnInit() {
  //best use case use this going forward
  this._interactionService.isLoggedIn$.subscribe(msg => alert(msg));
  //doesn't work
  this._authenticationComponent.currentLoggedInStatus.subscribe(
    this.isAutheticated =  this._authService.isAuthenticated()
  )
  //this will listen to all the events emitted and update nav html



//doesn't work
  this._authenticationComponent.onLoggedIn.subscribe({
    next: (event: LoggedInEvent) => {
      console.log(`Received message #${event.principle}: ${event.sessionId}`);
      this.isAutheticated =  this._authService.isAuthenticated();
    }
  })
  //works
  this._router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.isAutheticated =  this._authService.isAuthenticated();
      console.log('Navigation listening to events: ' + event.constructor.name);
     }
  } );

  }

  cleanUp() {
  sessionStorage.clear(); 
  this._cookieService.delete('JSESSIONID','/');

  }

}
