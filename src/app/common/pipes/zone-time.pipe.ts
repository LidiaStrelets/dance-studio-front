import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '@services/language.service';

@Pipe({
  name: 'zoneTime',
})
export class ZoneTimePipe implements PipeTransform {
  constructor(private languageService: LanguageService) {}
  transform(value: string, ...args: unknown[]): string {
    const locale = this.languageService.isUk ? 'uk-UK' : 'en-GB';

    const zoned = new Date(value).toLocaleString(locale, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    const date = `${value.split('T')[0]}T${zoned.split(', ')[1]}`;

    return date;
  }
}
