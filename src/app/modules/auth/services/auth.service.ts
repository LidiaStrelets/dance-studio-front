import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TokenData } from '@authModule/types/types';
import { catchError, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '@services/alert.service';
import { routesPaths } from '@app/app-routing.module';
import { environment } from '@root/environments/environment';
import { LoaderService } from '@services/loader.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LocalStorageKeys } from '@app/common/types/types';
import { Roles, TRoles } from '@userModule/types/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private tokenKey = LocalStorageKeys.token;
  private url = `${environment.basicUrl}auth/currentId`;
  private userData = new BehaviorSubject<TokenData>({});
  private subscription: Subscription;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private http: HttpClient,
    private loader: LoaderService
  ) {
    this.subscription = this.userData.subscribe((res) => {
      if (!res.id || !res.role) {
        return;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setUserRole(role: TRoles) {
    this.userData.next({ ...this.userData.value, role });
  }

  public authenticate(token: string) {
    const existingToken = localStorage.getItem(this.tokenKey);
    if (existingToken) {
      return;
    }

    localStorage.setItem(this.tokenKey, JSON.stringify(token));

    this.router.navigate(['./', routesPaths.home]);

    this.getUserData();
  }

  public getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  public deauthenticate() {
    localStorage.removeItem(this.tokenKey);

    this.alertService.presentAlertUnauthorized();
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);

    window.location.reload();
  }

  public isAuthenticated() {
    return !!this.getToken();
  }

  public redirectAuthenticated() {
    if (this.isAuthenticated()) {
      this.router.navigate([routesPaths.home]);
    }
  }

  public getUserData() {
    if (!this.getToken()) {
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

  public setUserId(id: string) {
    this.userData.next({ ...this.userData.value, id });
  }

  public getCurrentUserId() {
    return this.userData.value.id;
  }
  public getUserRole() {
    return this.userData.value.role;
  }

  public isCoach() {
    return this.userData.value.role === Roles.coach;
  }
  public isClient() {
    return this.userData.value.role === Roles.client;
  }
}
