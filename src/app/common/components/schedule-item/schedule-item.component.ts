import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { routesPaths } from '@app/app-routing.module';
import { CancellFunction } from '@app/common/types/types';
import { AuthService } from '@authModule/services/auth.service';
import { CoachClass } from '@coachClassesModule/types/types';
import { Training } from '@schedulesModule/types/types';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleItemComponent implements OnInit {
  @Input()
  item?: Training | CoachClass;
  @Input()
  cancell?: CancellFunction;
  @Input()
  archive?: boolean;

  public showPersonalsPart = false;
  public isCoach;

  constructor(private authService: AuthService, private location: Location) {
    this.isCoach = this.authService.isCoach();
  }

  ngOnInit() {
    if (this.location.path().includes(routesPaths.personals)) {
      this.showPersonalsPart = true;
    }
  }
}
