import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { routesPaths } from '@app/app-routing.module';
import { AuthService } from '@authModule/services/auth.service';
import { CoachClass } from '@coachClassesModule/types';
import { CancellEnrollmentEvent, Registration } from '@enrollmentsModule/types';
import { Training } from '@schedulesModule/types';
import { DateService } from '@services/date.service';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss'],
})
export class ScheduleItemComponent implements OnInit {
  @Input() item?: Training | CoachClass;
  @Input() enroll?: (item: Registration) => void;
  @Input() cancell?: ({ scheduleId }: CancellEnrollmentEvent) => void;
  @Input() archive?: boolean;

  showButtons = false;
  showEnrollmentPart = false;
  showPersonalsPart = false;

  constructor(
    private dateService: DateService,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit() {
    if (this.location.path().includes(routesPaths.schedule)) {
      this.showButtons = true;
    }
    if (this.location.path().includes(routesPaths.enrollments)) {
      this.showEnrollmentPart = true;
    }
    if (this.location.path().includes(routesPaths.personals)) {
      this.showPersonalsPart = true;
    }
  }

  getTimePart = () => {
    if (!this.item) {
      return;
    }
    return this.showPersonalsPart
      ? this.dateService.getDateTime(this.item.date_time)
      : this.dateService.getTime(this.item.date_time);
  };

  isCoach = this.authService.isCoach();
}
