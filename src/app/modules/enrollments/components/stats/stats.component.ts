import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DateService } from '@services/date.service';
import { LoaderService } from '@services/loader.service';
import { Stats, StatsKeys } from '@enrollmentsModule/types/types';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent implements OnInit, OnChanges {
  @Input()
  current = 0;

  public stats: Stats = {} as Stats;
  public classesNames: StatsKeys[] = [];

  constructor(
    private enrollmentsService: EnrollmentsService,
    private loader: LoaderService,
    private dateService: DateService,
    private changes: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'current' && value === 2) {
        this.loader.showSpinner();
        this.enrollmentsService.getStats()?.subscribe({
          next: (res) => {
            this.stats = res;
            const allKeys = Object.keys(res) as StatsKeys[];

            this.stats = allKeys.reduce((filtered, key) => {
              const value = this.stats[key];
              if (value) {
                filtered[key] =
                  key === 'totalMinutes'
                    ? this.dateService.convertIntoHours(value)
                    : value;
              }
              return filtered;
            }, {} as Stats);

            this.classesNames = allKeys.filter((item) =>
              this.stats.hasOwnProperty(item)
            ) as StatsKeys[];

            this.changes.markForCheck();
            this.loader.hideSpinner();
          },
          error: (err) => {
            catchError(err);
            this.loader.hideSpinner();
          },
        });
      }
    }
  }
}
