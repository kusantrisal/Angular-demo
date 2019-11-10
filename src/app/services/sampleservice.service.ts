import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SampleserviceService {

  constructor() { }

  getUsers() {
    return [
      {"id":1, "fname":"Kushwant", "lname":"Risal"},
      {"id":1, "fname":"Partap", "lname":"Risal"}
    ];
  }
  
}
