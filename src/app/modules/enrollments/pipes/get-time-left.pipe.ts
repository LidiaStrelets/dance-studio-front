import { Pipe, PipeTransform } from '@angular/core';
import { WithDate } from '@app/common/types/types';
import { DateService } from '@services/date.service';

@Pipe({
  name: 'getTimeLeft',
})
export class GetTimeLeftPipe implements PipeTransform {
  constructor(private dateService: DateService) {}

  transform<T extends WithDate>(value: T): number {
    const left =
      new Date(value.date_time).getTime() -
      Date.now() -
      this.dateService.hourInMs;
    const minutes = this.dateService.convertIntoMinutes(left);

    return Math.round(minutes);
  }
}
