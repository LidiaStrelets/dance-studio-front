import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys, Roles, TokenData, TRoles } from 'src/types';
import { catchError, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';
import { routesPaths } from 'src/app/app-routing.module';
import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/services/loader.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenKey = LocalStorageKeys.token;

  private url = `${environment.basicUrl}auth/currentId`;
  private userData = new BehaviorSubject<TokenData>({});

  constructor(
    private router: Router,
    private alertService: AlertService,
    private http: HttpClient,
    private loader: LoaderService
  ) {
    this.userData.subscribe((res) => {
      if (!res.id || !res.role) {
        return;
      }
    });
  }

  authenticate(token: string) {
    const existingToken = localStorage.getItem(this.tokenKey);
    if (existingToken) {
      return;
    }

    localStorage.setItem(this.tokenKey, JSON.stringify(token));

    this.router.navigate(['./', routesPaths.home]);

    this.getUserData();
  }

  getToken = () => localStorage.getItem(this.tokenKey);

  deauthenticate() {
    localStorage.removeItem(this.tokenKey);

    this.alertService.presentAlertUnauthorized();
  }

  logout = () => {
    localStorage.removeItem(this.tokenKey);

    window.location.reload();
  };

  isAuthenticated = () => !!this.getToken();

  redirectAuthenticated = () => {
    if (this.isAuthenticated()) {
      this.router.navigate([routesPaths.home]);
    }
  };

  getUserData() {
    if (!this.getToken()) {
      this.deauthenticate();
      return;
    }

    this.loader.showSpinner();
    this.http
      .get<{ data: { id: string; role: TRoles } }>(this.url)
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1)
      )
      .subscribe({
        next: (res) => {
          this.setUserId(res.data.id);
          this.setUserRole(res.data.role);
          this.loader.hideSpinner();
        },
      });
  }

  setUserId(id: string) {
    this.userData.next({ ...this.userData.value, id });
  }
  setUserRole(role: TRoles) {
    this.userData.next({ ...this.userData.value, role });
  }

  getCurrentUserId = () => this.userData.value.id;
  getUserRole = () => this.userData.value.role;

  isCoach = () => this.userData.value.role === Roles.coach;
}
