import { Component, Input, OnInit } from '@angular/core';
import { WithDate } from '@app/types';
import { CoachClass } from '@coachClassesModule/types';
import { TranslateService } from '@ngx-translate/core';
import { DateService } from '@services/date.service';

@Component({
  selector: 'app-classes-details',
  templateUrl: './classes-details.component.html',
  styleUrls: ['./classes-details.component.scss'],
})
export class ClassesDetailsComponent implements OnInit {
  @Input() item: CoachClass = {} as CoachClass;

  constructor(
    private dateService: DateService,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  getTimePart = <T extends WithDate>(item: T) =>
    this.dateService.getTime(item.date_time);

  getClassType = (item: CoachClass) => {
    const typeTranslation = this.translate.instant(
      `coachClasses.type.${item.type}`
    );
    const restTranslation = this.translate.instant(`coachClasses.class`);

    return `${typeTranslation} ${restTranslation}`;
  };
}
