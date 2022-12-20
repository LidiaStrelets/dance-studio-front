import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@authModule/services/auth.service';
import { Note, NoteUpdate } from '@coachClassesModule/types';
import { environment } from '@root/environments/environment';
import { catchError, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private coreUrl = `${environment.basicUrl}notes/`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  create(note: NoteUpdate): Observable<Note> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http.post<Note>(this.coreUrl, note).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }

  update(note: Note): Observable<Note> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http.patch<Note>(this.coreUrl + note.id, note).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }

  get(class_id: string): Observable<Note> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http.get<Note>(this.coreUrl + class_id).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }
}
