import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { routesPaths } from 'src/app/app-routing.module';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsCoachGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isCoach()) {
      this.router.navigate([routesPaths.home]);
      return false;
    }
    return true;
  }
}
