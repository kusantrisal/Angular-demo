import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class InteractionService {
  private _isLoggedInEvent = new Subject<String>();
  isLoggedIn$ = this._isLoggedInEvent.asObservable();
  constructor() {}

  userLoggedIn(msg: string) {
    this._isLoggedInEvent.next(msg);
  }
}
