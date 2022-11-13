import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Stats, StatsKeys } from 'src/types';
import { EnrollmentsService } from '../../services/enrollments.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  stats: Stats = {} as Stats;

  classesNames: StatsKeys[] = [];
  constructor(
    private enrollmentsService: EnrollmentsService,
    private loader: LoaderService,
    private dateService: DateService
  ) {}

  ngOnInit() {
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
      },
    });

    this.loader.hideSpinner();
  }
}
