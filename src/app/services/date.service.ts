import { WeekDay } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  defaultDate = '2000-12-12';
  // monitor this - removed split
  baseScheduleDate = new Date().toISOString();
  templateWeekStart = '2022-10-17';
  templateWeekEnd = '2022-10-24';

  constructor() {}

  getWeekDay = (date: string) => {
    const formated = new Date(date);
    return {
      day: `schedule.${WeekDay[formated.getDay()].toLowerCase()}`,
      id: formated.getDay(),
    };
  };
  getMinScheduleDate = () => new Date('2021-10-01').toISOString();
  getMaxEnrollmentsDate = () => new Date('2027-12-31').toISOString();

  getAlmostExpired = () => 24 * 3 * 60 * 60 * 1000;

  hourInMs = () => 60 * 60 * 1000;
  dayInMs = () => this.hourInMs() * 24;
  convertIntoMinutes = (time: number) => time / 60 / 1000;
  convertIntoHours = (time: number) => Math.round(time / 60);

  isOtherDate = (date: string, selectedDate: string) => {
    return !(
      new Date(date).getMonth() === new Date(selectedDate).getMonth() &&
      new Date(date).getDate() === new Date(selectedDate).getDate() &&
      new Date(date).getFullYear() === new Date(selectedDate).getFullYear()
    );
  };
}
