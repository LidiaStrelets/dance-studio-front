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

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
    private errorService: ErrorService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error.message;
        const errorStatus = error.status;

        this.alertService.presentAlertError(
          this.errorService.generateMessage(errorMessage, errorStatus)
        );

        return throwError({ message: errorMessage, status: errorStatus });
      })
    );
  }
}
