import { WeekDay } from '@angular/common';
import { Injectable } from '@angular/core';
import { ZoneTimePipe } from '@app/pipes/zone-time.pipe';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  defaultDate = '2000-12-12';
  // monitor this - removed split
  baseScheduleDate = new Date().toISOString();
  templateWeekStart = '2022-10-17';
  templateWeekEnd = '2022-10-24';

  constructor(private zoneTime: ZoneTimePipe) {}

  convertForPicker = (date: string): string => {
    return date.split('T')[0];
  };

  getDate = (date: string) => date.split('T')[0];
  getTime = (date: string) => date.split('T')[1].slice(0, 5);
  getDateTime = (date: string) =>
    this.zoneTime.transform(date).split('T').join(' ').slice(0, 16);

  getWeekDay = (date: string) => {
    const formated = new Date(date);
    return {
      day: `schedule.${WeekDay[formated.getDay()].toLowerCase()}`,
      id: formated.getDay(),
    };
  };
  getMinScheduleDate = () => new Date('2021-10-01').toISOString();
  getMaxEnrollmentsDate = () => new Date('2027-12-31').toISOString();

  getEnrollmentValidity = () => 1000 * 60 * 60 * 24 * 28;

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
