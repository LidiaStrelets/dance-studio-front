import { Component, OnInit } from '@angular/core';
import { routesPaths } from 'src/app/app-routing.module';

@Component({
  selector: 'app-personals',
  templateUrl: './personals.page.html',
  styleUrls: ['./personals.page.scss'],
})
export class PersonalsPage implements OnInit {
  routerPath = routesPaths;

  constructor() {}

  ngOnInit() {}
}
