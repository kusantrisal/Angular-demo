import { Component, OnInit, EventEmitter, Output  } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { HttpService } from "../services/http/http.service";
import { Router, ActivatedRoute , ParamMap} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { InteractionService } from '../services/interaction/interaction.service';


export class LoggedInEvent {
  principle: string;
  sessionId: string;
}

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.css"]
})
export class AuthenticationComponent implements OnInit {
  constructor(private fb: FormBuilder, 
              private _httpService: HttpService, 
              private _router: Router, 
              private _activatedRoute: ActivatedRoute,
              private _interactionService: InteractionService) {}

public onLoggedIn: EventEmitter<LoggedInEvent> = new EventEmitter<LoggedInEvent>();
loggedInEvent = new BehaviorSubject<String>('loggedin');
currentLoggedInStatus = this.loggedInEvent.asObservable();

 //@Output() onLoggedIn = new EventEmitter<LoggedInEvent>();
  showLogInForm = true;
  public logInForm: FormGroup;

  ngOnInit() {

    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      if(params.get('signup') !== null){
      this.showLogInForm = false;
    }
    })

    this.logInForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(2)]],
      password: ["", [Validators.required, Validators.minLength(1)]]
    });
  }

  showSignUpForm() {
    this.showLogInForm = false;
  }

  showLoginForm() {
    //if the form is filled out do something
    if (this.logInForm.valid) {
      this._httpService.logIn(this.logInForm.value).subscribe(data => {
        console.log(data);
        //set a flag in local storage if logedin to display secured content
        sessionStorage.setItem("Authenticated", JSON.stringify(data));
        this.onLoggedIn.emit({principle:'abc', sessionId: '123'});
        console.log('')
        this.loggedInEvent.next('authenticated');

        //send logged in msg to interacion
        this._interactionService.userLoggedIn('authenticated');
        //if logged in successfully send to home
        this._router.navigate(['/home']);
      }, error => {
        console.error('ERR ' + error);
      });
    } else {
      this.showLogInForm = true;
    }
  }
}
