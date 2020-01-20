import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private _authService: AuthService, private _router: Router) {}

  isAutheticated;
  colorToggle = "primary";
  backgroundColorToggle = "primary";

  ngOnInit() {
    this.isAutheticated = this._authService.isAuthenticated();
  }
}
