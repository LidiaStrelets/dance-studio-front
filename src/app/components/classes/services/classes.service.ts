import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClassItemFull } from 'src/types';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  private coreUrl = `${environment.basicUrl}classes/`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getClasses = (): Observable<ClassItemFull[]> | null => {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http.get<ClassItemFull[]>(this.coreUrl).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  };

  getById = (id: string): Observable<ClassItemFull> | null => {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http.get<ClassItemFull>(this.coreUrl + id).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  };
}
