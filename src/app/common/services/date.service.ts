import { WeekDay } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  public defaultDate = '2000-12-12';
  // monitor this - removed split
  public baseScheduleDate = new Date().toISOString();
  public templateWeekStart = '2022-10-17';
  public templateWeekEnd = '2022-10-24';
  public hourInMs = 60 * 60 * 1000;
  public dayInMs = this.hourInMs * 24;

  constructor() {}

  public getWeekDay(date: string) {
    const formated = new Date(date);
    return {
      day: `schedule.${WeekDay[formated.getDay()].toLowerCase()}`,
      id: formated.getDay(),
    };
  }
  public getMinScheduleDate() {
    return new Date('2021-10-01').toISOString();
  }
  public getMaxEnrollmentsDate() {
    return new Date('2027-12-31').toISOString();
  }

  public getAlmostExpired() {
    return 24 * 3 * 60 * 60 * 1000;
  }

  public convertIntoMinutes(time: number) {
    return time / 60 / 1000;
  }
  public convertIntoHours(time: number) {
    return Math.round(time / 60);
  }

  public isOtherDate(date: string, selectedDate: string) {
    return !(
      new Date(date).getMonth() === new Date(selectedDate).getMonth() &&
      new Date(date).getDate() === new Date(selectedDate).getDate() &&
      new Date(date).getFullYear() === new Date(selectedDate).getFullYear()
    );
  }
}
