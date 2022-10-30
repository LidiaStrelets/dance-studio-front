import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClassItemFull } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  private coreUrl = `${environment.basicUrl}classes/`;

  constructor(private http: HttpClient) {}

  getClasses = (): Observable<ClassItemFull[]> =>
    this.http.get<ClassItemFull[]>(this.coreUrl).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );

  getById = (id: string): Observable<ClassItemFull> =>
    this.http.get<ClassItemFull>(this.coreUrl + id).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
}
