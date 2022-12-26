import { Pipe, PipeTransform } from '@angular/core';
import { WithDate } from '@app/common/types/types';
import { DateService } from '@services/date.service';
import { GetTimeLeftPipe } from './get-time-left.pipe';

@Pipe({
  name: 'classIsComing',
})
export class ClassIsComingPipe implements PipeTransform {
  constructor(private getTimeLeft: GetTimeLeftPipe) {}

  transform<T extends WithDate>(value: T, ...args: unknown[]): boolean {
    return (
      this.getTimeLeft.transform(value) < 60 &&
      this.getTimeLeft.transform(value) > 0
    );
  }
}
