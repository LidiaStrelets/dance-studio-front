import { WeekDay } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getWeekDay',
})
export class GetWeekDayPipe implements PipeTransform {
  transform(value: string): string {
    const formated = new Date(value);

    return `schedule.${WeekDay[formated.getDay()].toLowerCase()}`;
  }
}
