import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  show = false;

  constructor() {}

  ngOnInit() {
    setTimeout(() => (this.show = true), 300);
  }
}
