import { WeekDay } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  defaultDate = new Date('2000-12-12');
  baseScheduleDate = new Date().toISOString();
  templateWeekStart = new Date('2022-10-17');
  templateWeekEnd = new Date('2022-10-24');

  constructor() {}

  convertForPicker = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  getDate = (date: string) => date.split('T')[0];
  getTime = (date: Date) => date.toISOString().split('T')[1].slice(0, 5);
  getDateTime = (date: string) =>
    date.split('T')[0] + ' ' + date.split('T')[1].slice(0, 5);
  getWeekDay = (date: Date) => ({
    day: `schedule.${WeekDay[date.getDay()].toLowerCase()}`,
    id: date.getDay(),
  });
  getMinScheduleDate = () => new Date('2021-10-01').toISOString();
  getMinEnrollmentsDate = () => {
    const today = new Date(Date.now()).toISOString().split('T')[0];
    return new Date(today).toISOString();
  };
  getMaxEnrollmentsDate = () => new Date('2027-12-31').toISOString();

  getEnrollmentValidity = () => 1000 * 60 * 60 * 24 * 28;

  getAlmostExpired = () => 24 * 3 * 60 * 60 * 1000;

  hourInMs = () => 60 * 60 * 1000;
  dayInMs = () => this.hourInMs() * 24;
  convertIntoMinutes = (time: number) => time / 60 / 1000;
  convertIntoHours = (time: number) => time / 60;
}
