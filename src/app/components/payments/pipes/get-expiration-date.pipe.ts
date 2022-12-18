import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toExpirationDate',
})
export class GetExpirationDatePipe implements PipeTransform {
  getEnrollmentValidity = () => 1000 * 60 * 60 * 24 * 28;

  transform(value: string, ...args: unknown[]): string {
    const expDateMs = new Date(value).getTime() + this.getEnrollmentValidity();

    return new Date(expDateMs).toISOString();
  }
}
