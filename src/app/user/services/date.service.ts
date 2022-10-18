import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  convertForPicker = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
}
