import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from 'src/types';
import { routesPaths } from '../app-routing.module';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenKey = LocalStorageKeys.token;
  constructor(private router: Router, private alertService: AlertService) {}

  authenticate(token: string) {
    const existingToken = localStorage.getItem(this.tokenKey);
    if (existingToken) {
      console.log('error!');
      return;
    }

    localStorage.setItem(this.tokenKey, JSON.stringify(token));

    this.router.navigate(['./', routesPaths.home]);
  }

  getToken = () => localStorage.getItem(this.tokenKey);

  deauthenticate() {
    localStorage.removeItem(this.tokenKey);

    this.alertService.presentAlertUnauthorized();
  }

  isAuthenticated = () => !!this.getToken();

  redirectAuthenticated = () => {
    if (this.isAuthenticated()) {
      this.router.navigate([routesPaths.home]);
    }
  };
}
