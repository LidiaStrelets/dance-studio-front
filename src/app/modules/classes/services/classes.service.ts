import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from '@root/environments/environment';
import { ClassItemFull } from '@classesModule/types/types';
import { AuthService } from '@authModule/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  private coreUrl = `${environment.basicUrl}classes/`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getClasses(): Observable<ClassItemFull[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http.get<ClassItemFull[]>(this.coreUrl).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }

  public getById(id: string): Observable<ClassItemFull> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http.get<ClassItemFull>(this.coreUrl + id).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }
}
