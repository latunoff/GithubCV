import { Component, Input, OnInit } from '@angular/core';
import { User } from './githubcv.user';

@Component({
  selector: 'app-output-cv',
  template: `<div [ngSwitch]="type">
    <app-tpl-output *ngSwitchCase="'first'" [user]="user"></app-tpl-output>
    <app-tpl-output2 *ngSwitchCase="'second'" [user]="user"></app-tpl-output2>
  </div>`
})
export class OutputCvComponent implements OnInit {
  @Input() type: string;
  @Input() user: User;

  constructor() { }

  ngOnInit() {
    // console.log('OutputCvComponent', this.user);
  }
}
