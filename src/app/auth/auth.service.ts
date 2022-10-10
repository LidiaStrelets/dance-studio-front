import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private alertService: AlertService) {}

  authenticate(token: string) {
    const existingToken = localStorage.getItem('token');
    if (existingToken) {
      console.log('error!');
      return;
    }

    localStorage.setItem('token', JSON.stringify(token));

    this.router.navigate(['./', 'home']);
  }

  getToken = () => localStorage.getItem('token');

  deauthenticate() {
    localStorage.removeItem('token');

    this.alertService.presentAlertUnauthorized();
  }

  isAuthenticated = () => !!this.getToken();

  redirectAuthenticated = () => {
    if (this.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  };
}
