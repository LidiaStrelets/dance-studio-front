import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  defaultDate = new Date('2000-12-12');

  constructor() {}

  convertForPicker = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
}
