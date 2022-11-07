import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { ErrorService } from '../services/error.service';
import { AuthService } from '../components/auth/services/auth.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
    private errorService: ErrorService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.message;
        const errorStatus = error.status;

        const created: NodeJS.ErrnoException = new Error(errorMessage);
        created.code = errorStatus.toString();

        if (error.status === 401) {
          this.authService.deauthenticate();
          return throwError(() => created);
        }

        this.alertService.presentAlertError(
          this.errorService.generateMessage(errorMessage, errorStatus)
        );

        return throwError(() => created);
      })
    );
  }
}
