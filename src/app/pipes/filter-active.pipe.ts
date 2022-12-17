import { Pipe, PipeTransform } from '@angular/core';
import { WithDate } from '@app/types';

@Pipe({
  name: 'filterActive',
})
export class FilterActivePipe implements PipeTransform {
  transform<T extends WithDate>(value: T[]): T[] {
    return value.filter(
      (item) => new Date(item.date_time) > new Date(Date.now())
    );
  }
}
