import { Pipe, PipeTransform } from '@angular/core';
import { Training } from '@schedulesModule/types/types';
import { DateService } from '@services/date.service';

@Pipe({
  name: 'filterClassSchedule',
})
export class FilterClassSchedulePipe implements PipeTransform {
  constructor(private dateService: DateService) {}

  transform(value: Training[], days?: number[], classId?: string): Training[] {
    let res = value;
    if (classId) {
      res = res.filter((item) => item.class_id === classId);
    }
    if (days && days.length > 0) {
      res = res.filter((item) =>
        days.some(
          (day) => day + 1 === this.dateService.getWeekDay(item.date_time).id
        )
      );
    }
    return res;
  }
}
