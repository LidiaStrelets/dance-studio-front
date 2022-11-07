import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../components/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
    }

    return next.handle(request);
  }
}
