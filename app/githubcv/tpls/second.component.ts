import { Component, Input } from '@angular/core';
import { User } from '../githubcv.user';

@Component({
  selector: 'app-tpl-output2',
  templateUrl: './second.component.html',
  styles: [`h1 {}`]
})
export class SecondTplComponent {
  
  private _user: User;

  constructor() {}

  get user(): User {
    return this._user;
  }

  @Input()
  set user(user: User) {
    this._user = user;
  }
}
