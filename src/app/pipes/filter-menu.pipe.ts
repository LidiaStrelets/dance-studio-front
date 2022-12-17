import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from '@app/types';
import { Roles, TRoles } from '@userModule/types';

@Pipe({
  name: 'filterMenu',
})
export class FilterMenuPipe implements PipeTransform {
  transform(value: MenuItem[], role: TRoles | undefined): MenuItem[] {
    if (role === Roles.coach) {
      return value.filter(
        (item) => ![2, 4, 5, 9].some((number) => item.id === number)
      );
    }
    if (role === Roles.client) {
      return value.filter(
        (item) => ![10, 11].some((number) => item.id === number)
      );
    } else return [];
  }
}
