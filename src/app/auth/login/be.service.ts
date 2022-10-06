import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class BeService {
  private url = 'http://localhost:5555/auth/login';

  constructor(private http: HttpClient) {}

  register(data: LoginData) {
    return this.http.post(this.url, data);
  }
}
