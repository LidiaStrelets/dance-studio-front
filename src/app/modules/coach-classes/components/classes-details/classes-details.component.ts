import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CoachClass } from '@coachClassesModule/types/types';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-classes-details',
  templateUrl: './classes-details.component.html',
  styleUrls: ['./classes-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesDetailsComponent implements OnInit, OnChanges {
  @Input()
  item: CoachClass = {} as CoachClass;

  public translation = '';

  constructor(private translate: TranslateService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'item' && value) {
        const typeTranslation = this.translate.instant(
          `coachClasses.type.${value.type}`
        );
        const restTranslation = this.translate.instant(`coachClasses.class`);

        this.translation = `${typeTranslation} ${restTranslation}`;
      }
    }
  }
}
