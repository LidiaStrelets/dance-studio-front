import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  radioItems = [
    { id: 0, day: 'schedule.monday' },
    { id: 1, day: 'schedule.tuesday' },
    { id: 2, day: 'schedule.wednesday' },
    { id: 3, day: 'schedule.thursday' },
    { id: 4, day: 'schedule.friday' },
    { id: 5, day: 'schedule.saturday' },
    { id: 6, day: 'schedule.sunday' },
  ];
}
