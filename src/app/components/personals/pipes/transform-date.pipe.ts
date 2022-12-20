import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDate',
})
export class TransformDatePipe implements PipeTransform {
  transform(value: string): string {
    return `${value.split(' ').join('T')}:00.326Z`;
  }
}
