import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AuthService } from '@authModule/services/auth.service';
import { CoachClass } from '@coachClassesModule/types/types';
import { LoaderService } from '@services/loader.service';
import { SocketService } from '@services/socket.service';
import { catchError } from 'rxjs';
import { routesPaths } from '@app/app-routing.module';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { Personal, Statuses } from '@personalsModule/types/types';

@Component({
  selector: 'app-personals',
  templateUrl: './personals.page.html',
  styleUrls: ['./personals.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalsPage implements OnInit {
  private personals: Personal[] = [];

  public coachClasses: CoachClass[] = [];
  public statuses = Statuses;
  public routeRoot = routesPaths.personals;

  constructor(
    private loader: LoaderService,
    private personalService: PersonalsService,
    private socketService: SocketService,
    private authService: AuthService,
    private changes: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.loader.showSpinner();

    this.personalService.getByUser()?.subscribe({
      next: (res) => {
        this.personals = res;
        this.coachClasses = this.personals.map((item) =>
          this.personalService.addType(item)
        );
        this.changes.markForCheck();
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });

    this.socketService.subscribeOnPersonal((item: Personal) => {
      if (item.client_id !== this.authService.getCurrentUserId()) {
        return;
      }

      const coachClass = this.personalService.addType(item);

      if (
        this.coachClasses.some((coachClass) => coachClass['id'] === item.id)
      ) {
        this.coachClasses = this.coachClasses.map((classItem) =>
          classItem['id'] === item.id ? coachClass : classItem
        );
      } else {
        this.coachClasses = [...this.coachClasses, coachClass];
      }
      this.changes.markForCheck();
    });
  }

  public trackMessages(index: number, item: CoachClass) {
    return item['id'];
  }
}
