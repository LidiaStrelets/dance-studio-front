import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { routesPaths } from '@app/app-routing.module';
import { FormatDatePipe } from '@app/pipes/format-date.pipe';
import { AuthService } from '@authModule/services/auth.service';
import { CoachClass } from '@coachClassesModule/types';
import { CancellEnrollmentEvent } from '@enrollmentsModule/types';
import { Training } from '@schedulesModule/types';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss'],
})
export class ScheduleItemComponent implements OnInit {
  @Input() item?: Training | CoachClass;
  @Input() cancell?: ({ scheduleId }: CancellEnrollmentEvent) => void;
  @Input() archive?: boolean;

  showPersonalsPart = false;

  constructor(
    private authService: AuthService,
    private location: Location,
    private formatDate: FormatDatePipe
  ) {}

  ngOnInit() {
    if (this.location.path().includes(routesPaths.personals)) {
      this.showPersonalsPart = true;
    }
  }

  getTimePart = () => {
    if (!this.item) {
      return;
    }
    return this.showPersonalsPart
      ? this.formatDate.transform(this.item.date_time, 'date-time')
      : this.formatDate.transform(this.item.date_time, 'time');
  };

  isCoach = () => this.authService.isCoach();
}
