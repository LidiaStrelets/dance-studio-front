import { Pipe, PipeTransform } from '@angular/core';
import { DateFormat } from '@app/common/types/types';
import { ZoneTimePipe } from '@pipes/zone-time.pipe';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  constructor(private zoneTime: ZoneTimePipe) {}

  transform(value: string, format: DateFormat): string {
    switch (format) {
      case 'date':
        return value.split('T')[0];
      case 'time':
        return value.split('T')[1].slice(0, 5);
      case 'date-time':
        return this.zoneTime.transform(value).split('T').join(' ').slice(0, 16);
    }
  }
}
