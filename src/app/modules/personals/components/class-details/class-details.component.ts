import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routesPaths } from '@app/app-routing.module';
import { CoachClass } from '@coachClassesModule/types/types';
import { TranslateService } from '@ngx-translate/core';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { Statuses } from '@personalsModule/types/types';
import { LoaderService } from '@services/loader.service';
import { catchError, Subscription } from 'rxjs';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassDetailsComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  public item!: CoachClass;
  public statuses = Statuses;
  public rootPath = routesPaths.personals;
  public statusMessage = '';

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private personalsService: PersonalsService,
    private loader: LoaderService,
    private changes: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe((res) => {
      const scheduleId = res.get('id');
      if (scheduleId) {
        this.loader.showSpinner();
        this.personalsService.get(scheduleId)?.subscribe({
          next: (res) => {
            this.item = this.personalsService.addType(res[0]);
            this.statusMessage = this.translate.instant(
              `personals.statuses.${this.item.status}`
            );
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public back() {
    this.router.navigate([routesPaths.personals]);
  }
}
