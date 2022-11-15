import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from '@root/environments/environment';
import { ClassItem, ClassItemFull } from '@classesModule/types';
import { AuthService } from '@authModule/services/auth.service';
import { LanguageService } from '@services/language.service';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  private coreUrl = `${environment.basicUrl}classes/`;
  private classes: ClassItemFull[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private languageService: LanguageService
  ) {}

  setClasses = (classes: ClassItemFull[]) => (this.classes = classes);
  getCurrentClasses = () => this.translateClasses(this.classes);

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

  translateClasses = (classes: ClassItemFull[]): ClassItem[] =>
    classes.map(({ id, name, nameUk, description, descriptionUk }) =>
      this.languageService.isUk()
        ? { id, name: nameUk, description: descriptionUk }
        : { id, name, description }
    );
}
