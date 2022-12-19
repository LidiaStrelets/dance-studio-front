import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Training } from '@schedulesModule/types';
import { DateService } from '@services/date.service';
import { CancellEnrollmentEvent } from '@enrollmentsModule/types';
import { FormatDatePipe } from '@app/pipes/format-date.pipe';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent implements OnInit, OnChanges {
  @Output() setDate = new EventEmitter<string>();
  @Input() items: Training[] = [];
  @Input() archive?: boolean;
  @Input() current = 0;

  showDate = false;

  fieldName = 'date';

  constructor(
    private dateService: DateService,
    private formatDate: FormatDatePipe
  ) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'current') {
        if ((value === 0 && !this.archive) || (value === 1 && this.archive)) {
          this.setDate.emit(
            this.formatDate.transform(this.dateService.baseScheduleDate, 'date')
          );
        }
      }
    }
  }

  closeDate = () => {
    if (!this.showDate) {
      return;
    }
    this.showDate = !this.showDate;
  };

  toggleDate = (form: FormGroup) => {
    this.showDate = !this.showDate;
    if (!this.showDate) {
      this.setDate.emit(
        this.formatDate.transform(form.get(this.fieldName)?.value ?? '', 'date')
      );
    }
  };

  getDate = (form: FormGroup) => form.get(this.fieldName)?.value;

  cancell = ({ scheduleId }: CancellEnrollmentEvent) => {
    this.items = this.items.filter((item) => item.id !== scheduleId);
  };

  getTimeLeft = (date: string) => {
    const left =
      new Date(date).getTime() - Date.now() - this.dateService.hourInMs();
    const minutes = this.dateService.convertIntoMinutes(left);

    return Math.round(minutes);
  };

  trackEnrollments = (index: number, item: Training) => item.id;
}
