import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import { SampleserviceService } from '../services/sampleservice.service';
import { HttpService } from '../services/http/http.service';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { ProfileComponent } from '../profile/profile.component';

@Component({
  //3 ways to specify selector 2) .app-home -> <div class="app-home"> 3) [app-home] -> <div app-home>
  selector: "app-home",
  templateUrl: "./home.component.html",
  //inline template
  //template: `
  //<p>
  // hello-world 
  // </p>`
  styleUrls: ["./home.component.css"]
  // styles:[`p {color : red;}`]
})
export class HomeComponent implements OnInit, AfterViewInit {
  
  @ViewChild('viewchildlocalref', {static: false}) viewchildlocalref: ElementRef;
  @ViewChild(ProfileComponent, {static: false}) profileComponent: ProfileComponent;

  constructor(private _sampleService: SampleserviceService, private _httpService: HttpService, private activatedRoute: ActivatedRoute, private route: Router) {

  }

  ngAfterViewInit() {
    console.log(this.viewchildlocalref.nativeElement);
    console.log(this.profileComponent);
  }


  public name = "name-value";
  public stieUrl = window.location.href;
  public myId = "some-id";
  public isDisabled = true;

  //class binding
  public successClass = "custom-success";
  public dangerClass = "custom-danger";

  //apply class based of boolean
  public hasError = true;

  //apply class based of boolean for multiple values
  public isSpecial = true;
  public messageClasses = {
    "custom-success": !this.hasError,
    "custom-danger": this.hasError,
    "custom-warning": this.isSpecial
  };

  //style binding
  public highlightColor = "yellow";
  public customStyles = {
    color: "blue",
    fontStyle: "italic"
  };

  public displayText;

  //services
public users = [];
public display = "block";
  ngOnInit() {
    //dont use this use the bottom one instead
    //this.display = this.activatedRoute.snapshot.paramMap.get("display")
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let id =  params.get('display');
      this.display = id;
    })

    this.users = this._sampleService.getUsers();
  }

  greetUser() {
    return "Hello " + this.name; 
  }

  //event handling
  onCLick() {
    this.isDisabled = false;
    this.highlightColor = "orange";
    console.log("Yo this is clicked");
  }
  onCLickPassEvent(event) {
    this.displayText = event.type;
    console.log(event);
  }

  logMessage(value) {
    console.log(value);
  }

  //two way binding ngModel
  public someValue = "";
  public displayThis = true;

  //switch
  public color = "yellow";

  //for loop
public colors = ["red","blue","green"];

//receive from app component

//this works if the below value is not used twice
@Input()
public parentData;

@Input('parentData')
public receivedFromParentComponent;

//child to parent
@Output() public childEvent = new EventEmitter();

public now: Date = new Date();

sendToParent() {
this.childEvent.emit("Data From child " + this.now);
}

//pipes
public myString = "welcome home";

public myJson = {
"name":"Kusant"
};

public currentDate : Date = new Date();

//observablers
public getResponse = [];
public error;
httpGetRequest(param) {
this._httpService.getRequest(param)
 .subscribe(res => this.getResponse = res, err => this.error = err);
}

onRoute(value) {
this.route.navigate(['/home', value]);
}



}
