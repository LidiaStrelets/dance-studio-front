import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CoachClass } from '@coachClassesModule/types';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-classes-details',
  templateUrl: './classes-details.component.html',
  styleUrls: ['./classes-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesDetailsComponent implements OnInit {
  @Input() item: CoachClass = {} as CoachClass;

  constructor(private translate: TranslateService) {}

  ngOnInit() {}

  getClassType = (item: CoachClass) => {
    const typeTranslation = this.translate.instant(
      `coachClasses.type.${item.type}`
    );
    const restTranslation = this.translate.instant(`coachClasses.class`);

    return `${typeTranslation} ${restTranslation}`;
  };
}
