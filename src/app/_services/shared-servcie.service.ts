import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SharedServcieService {

  private profileName = new BehaviorSubject<string>(localStorage.getItem('profileName'));
  username = this.profileName.asObservable();
  constructor() { }

  changeProfileName(username: string) {
    debugger;
    this.profileName.next(username);
  }
}
