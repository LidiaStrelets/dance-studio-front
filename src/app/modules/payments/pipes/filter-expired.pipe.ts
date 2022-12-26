import { Pipe, PipeTransform } from '@angular/core';
import { PaymentWithExiring } from '@paymentsModule/types/types';
import { GetExpirationDatePipe } from '@paymentsModule/pipes/get-expiration-date.pipe';

@Pipe({
  name: 'filterExpired',
})
export class FilterExpiredPipe implements PipeTransform {
  constructor(private getExpirationDate: GetExpirationDatePipe) {}

  transform(value: PaymentWithExiring[]): PaymentWithExiring[] {
    return value && value.length > 0
      ? value.filter(({ createdAt }) => {
          const expirationDate = this.getExpirationDate.transform(createdAt);

          return new Date(expirationDate).getTime() > Date.now();
        })
      : [];
  }
}
