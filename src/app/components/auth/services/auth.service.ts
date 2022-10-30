import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from 'src/types';
import { catchError, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';
import { routesPaths } from 'src/app/app-routing.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenKey = LocalStorageKeys.token;

  private url = `${environment.basicUrl}auth/currentId`;
  private userId = '';

  constructor(
    private router: Router,
    private alertService: AlertService,
    private http: HttpClient
  ) {}

  authenticate(token: string) {
    const existingToken = localStorage.getItem(this.tokenKey);
    if (existingToken) {
      return;
    }

    localStorage.setItem(this.tokenKey, JSON.stringify(token));

    this.router.navigate(['./', routesPaths.home]);

    this.getUserIdFromToken();
  }

  getToken = () => localStorage.getItem(this.tokenKey);

  deauthenticate() {
    localStorage.removeItem(this.tokenKey);

    this.alertService.presentAlertUnauthorized();
  }

  logout = () => {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate([routesPaths.login]);
    window.location.reload();
  };

  isAuthenticated = () => !!this.getToken();

  redirectAuthenticated = () => {
    if (this.isAuthenticated()) {
      this.router.navigate([routesPaths.home]);
    }
  };

  getUserIdFromToken() {
    if (!this.getToken()) {
      this.deauthenticate();
      return;
    }

    this.http
      .get<{ data: { id: string } }>(this.url)
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1)
      )
      .subscribe({
        next: (res) => this.setUserId(res.data.id),
      });
  }

  setUserId(id: string) {
    this.userId = id;
  }

  getCurrentUserId = () => this.userId;
}
