import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap  } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _activatedRoute : ActivatedRoute) { }
 edit = 'view';
  
 ngOnInit() {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let _edit =  params.get('edit');
      this.edit = _edit;
    })

  }

}
