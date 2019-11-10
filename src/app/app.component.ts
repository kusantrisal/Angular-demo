import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public shareToChildComponent = "Data From Parent";
  public messageFromChild;

  onActivate(componentReference) {
    console.log(componentReference);
    componentReference.receivedFromParentComponent = "Hey hey from parent";
    
    if('childEvent' in componentReference ) {
    componentReference.childEvent.subscribe((data) => {
      this.messageFromChild =  data;
      console.log(data);
   });
  }
 }
}
