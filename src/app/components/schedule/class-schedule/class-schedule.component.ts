import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/language.service';
import { ClassItemFull, ELanguages, Schedule, TClass } from 'src/types';
import { ClassesService } from '../../classes/services/classes.service';
import { DateService } from '../../user/services/date.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss'],
})
export class ClassScheduleComponent implements OnInit, OnChanges {
  @Output() setClass = new EventEmitter<string>();
  @Input() items: Schedule[] = [];
  filteredItems: Schedule[] = [];

  classItems: ClassItemFull[] = [];
  selectedClass?: TClass;

  selectedDays = new BehaviorSubject<{ days: number[]; items: Schedule[] }>({
    days: [],
    items: this.items,
  });
  selectValue: number[] = [];

  constructor(
    private classesService: ClassesService,
    private dateService: DateService,
    private languageService: LanguageService,
    private common: CommonService
  ) {}

  ngOnInit() {
    this.classesService.getClasses().subscribe({
      next: (res) => (this.classItems = res),
      error: catchError,
    });

    this.selectedDays.subscribe((res) => {
      this.filteredItems = this.items.filter((item) => {
        return res.days.some(
          (day) => day + 1 === this.dateService.getWeekDay(item.date_time).id
        );
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'items') {
        this.selectedDays.next({ days: this.selectValue, items: value });
      }
    }
  }

  radioItems = this.common.radioItems;

  getClasses = () =>
    this.classItems.map(({ id, name, nameUk }) =>
      this.languageService.getLanguage() === ELanguages.en
        ? { id, name }
        : { id, name: nameUk }
    );

  selectClass = (id: string) => {
    this.setClass.emit(id);
  };

  setSelectedDays = (days: number[]) => {
    this.selectedDays.next({ days, items: this.items });
  };

  getWeekDay = this.dateService.getWeekDay;
  getTime = this.dateService.getTime;
}
