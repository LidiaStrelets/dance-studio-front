import { Pipe, PipeTransform } from '@angular/core';
import { Training } from '@schedulesModule/types';
import { DateService } from '@services/date.service';

@Pipe({
  name: 'filterCoachSchedule',
})
export class FilterCoachSchedulePipe implements PipeTransform {
  constructor(private dateService: DateService) {}

  transform(value: Training[], coach_id: string, days: number[]): Training[] {
    let res = value;
    if (coach_id) {
      res = res.filter((item) => item.coach_id === coach_id);
    }
    if (days && days.length > 0) {
      res = res.filter((item) => {
        return days.some(
          (day) => day + 1 === this.dateService.getWeekDay(item.date_time).id
        );
      });
    }
    return res;
  }
}
