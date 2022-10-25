import { WeekDay } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  defaultDate = new Date('2000-12-12');
  baseScheduleDate = new Date('2022-10-21').toISOString();
  templateWeekStart = '2022-10-17T00:00:00.000Z';
  templateWeekEnd = '2022-10-24T00:00:00.000Z';

  constructor() {}

  convertForPicker = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  getDate = (date: string) => date.split('T')[0];
  getTime = (date: string) => date.split('T')[1].slice(0, 5);
  getDateTime = (date: string) =>
    date.split('T')[0] + ' ' + date.split('T')[1].slice(0, 5);
  getWeekDay = (date: string) => ({
    day: `schedule.${WeekDay[new Date(date).getDay()].toLowerCase()}`,
    id: new Date(date).getDay(),
  });
}
