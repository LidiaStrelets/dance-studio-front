import { Injectable } from '@angular/core';
import { Error } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  generateMessage(err: Error) {
    return err.error ? err.error[0].message : 'Server error';
  }
}
