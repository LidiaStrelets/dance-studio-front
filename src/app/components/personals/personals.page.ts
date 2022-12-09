import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EClassTypes, CoachClass } from '@coachClassesModule/types';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from '@services/loader.service';
import { catchError } from 'rxjs';
import { routesPaths } from 'src/app/app-routing.module';
import { PersonalsService } from './services/personals.service';
import { Personal, Statuses, TStatus } from './types';

@Component({
  selector: 'app-personals',
  templateUrl: './personals.page.html',
  styleUrls: ['./personals.page.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalsPage implements OnInit {
  routerPath = routesPaths;

  personals: Personal[] = [];
  mappedItems: CoachClass[] = [];
  statuses = Statuses;

  constructor(
    private loader: LoaderService,
    private personalService: PersonalsService,
    private translate: TranslateService
  ) {}

  async ngOnInit() {
    this.loader.showSpinner();

    this.personalService.getByUser()?.subscribe({
      next: (res) => {
        this.personals = res;
        // console.log('res', this.personals);
      },
      error: catchError,
    });

    this.loader.hideSpinner();
  }
  test() {
    console.log('render');
  }
  statusMessage = (status: TStatus) =>
    this.translate.instant(`personals.statuses.${status}`);

  mapPersonals = () => {
    // console.log('map', this.personals, this.mappedItems);

    this.personals = [
      ...this.personals,
      ...this.personalService.getPersonals(),
    ];

    this.mappedItems = this.personals.reduce((res, item) => {
      const mapped = this.personalService.addData(item);
      return mapped
        ? [
            ...res,
            {
              ...mapped,
              status: item.status,
              clients: [item.client_id],
              type: EClassTypes.personal,
              message: item.message,
            },
          ]
        : res;
    }, [] as CoachClass[]);

    return this.mappedItems;
  };
}
