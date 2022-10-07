import { Component, OnInit } from '@angular/core';
import { Hall } from 'src/types';
import { AlertService } from '../alert.service';
import { AuthService } from '../auth/auth.service';
import { HallService } from './hall.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  halls: Hall[] = [];

  menuItems = [
    'My profile',
    'My payments',
    'Schedules',
    'Coaches',
    'Classes',
    'Prices',
  ];

  constructor(
    private hallService: HallService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.hallService.get().subscribe(
      (res) => (this.halls = res),
      (err) => {
        if (err.status === 401) {
          this.authService.deauthenticate();
        } else {
          this.alertService.presentAlertError(err.error[0].message);
        }
      }
    );
  }
}
