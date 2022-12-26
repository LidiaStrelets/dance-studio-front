import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LanguageService } from '@services/language.service';
import { LoaderService } from '@services/loader.service';
import { Training, TrainingFull } from '@schedulesModule/types/types';
import { ClassesService } from '@classesModule/services/classes.service';
import { CommonService } from '@schedulesModule/services/common.service';
import { SchedulesService } from '@schedulesModule/services/schedules.service';
import { ClassItem } from '@classesModule/types/types';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassScheduleComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  current = -1;

  private weekSchedule: TrainingFull[] = [];
  private subscription: Subscription = {} as Subscription;

  public classes: ClassItem[] = [];
  public items: Training[] = [];
  public filters = new BehaviorSubject<{ days: number[]; classItem: string }>({
    days: [],
    classItem: '',
  });
  public selectValue: number[] = [];
  public radioItems;

  constructor(
    private classesService: ClassesService,
    private languageService: LanguageService,
    private common: CommonService,
    private loader: LoaderService,
    private schedulesService: SchedulesService
  ) {
    this.radioItems = this.common.radioItems;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'current' && value === 2) {
        this.loader.showSpinner();
        this.schedulesService.getWeek()?.subscribe({
          next: (res) => (this.weekSchedule = res),
          error: (err) => {
            catchError(err);
            this.loader.hideSpinner();
          },
          complete: () => this.loader.hideSpinner(),
        });

        this.loader.showSpinner();
        this.classesService.getClasses()?.subscribe({
          next: (res) => {
            this.classes = this.languageService.translateClasses(res);
          },
          error: (err) => {
            catchError(err);
            this.loader.hideSpinner();
          },
          complete: () => this.loader.hideSpinner(),
        });

        this.subscription = this.filters.subscribe((res) => {
          this.items = this.languageService.translateSchedule(
            this.weekSchedule
          );
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription.unsubscribe) {
      this.subscription.unsubscribe();
    }
  }

  public selectClass(id: string) {
    this.filters.next({ classItem: id, days: this.filters.value.days });
  }

  public setSelectedDays(days: number[]) {
    this.filters.next({ days, classItem: this.filters.value.classItem });
  }
}
