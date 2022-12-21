import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routesPaths } from '@app/app-routing.module';
import { CoachClass } from '@coachClassesModule/types';
import { TranslateService } from '@ngx-translate/core';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { Statuses, TStatus } from '@personalsModule/types';
import { LoaderService } from '@services/loader.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassDetailsComponent implements OnInit {
  item!: CoachClass;
  statuses = Statuses;

  rootPath = routesPaths.personals;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private personalsService: PersonalsService,
    private loader: LoaderService,
    private changes: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      const scheduleId = res.get('id');
      if (scheduleId) {
        this.loader.showSpinner();
        this.personalsService.get(scheduleId)?.subscribe({
          next: (res) => {
            this.item = this.personalsService.addType(res[0]);
            this.loader.hideSpinner();

            this.changes.markForCheck();
          },
          error: (err) => {
            catchError(err);
            this.loader.hideSpinner();
          },
        });
      }
    });
  }

  statusMessage = (status: TStatus) =>
    this.translate.instant(`personals.statuses.${status}`);

  back = () => {
    this.router.navigate([routesPaths.personals]);
  };
}
