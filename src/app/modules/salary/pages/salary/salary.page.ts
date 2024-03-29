import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AuthService } from '@authModule/services/auth.service';
import { SchedulesService } from '@schedulesModule/services/schedules.service';
import { LoaderService } from '@services/loader.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.page.html',
  styleUrls: ['./salary.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalaryPage implements OnInit {
  public salary = 0;
  public isCoach: boolean;

  constructor(
    private authService: AuthService,
    private schedulesService: SchedulesService,
    private loader: LoaderService,
    private changes: ChangeDetectorRef
  ) {
    this.isCoach = this.authService.isCoach();
  }

  ngOnInit() {
    this.loader.showSpinner();

    this.schedulesService.getSalary()?.subscribe({
      next: (res) => {
        this.salary = res;
        this.changes.markForCheck();
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });
  }
}
