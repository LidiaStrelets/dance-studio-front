import { Pipe, PipeTransform } from '@angular/core';
import { Payment } from '@paymentsModule/types';
import { GetExpirationDatePipe } from './get-expiration-date.pipe';

@Pipe({
  name: 'filterExpired',
})
export class FilterExpiredPipe implements PipeTransform {
  constructor(private getExpirationDate: GetExpirationDatePipe) {}

  transform(value: Payment[]): Payment[] {
    return value.filter(({ createdAt }) => {
      const expirationDate = this.getExpirationDate.transform(createdAt);

      return new Date(expirationDate).getTime() > Date.now();
    });
  }
}
