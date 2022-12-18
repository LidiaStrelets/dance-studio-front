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
  salary = 0;

  constructor(
    private authService: AuthService,
    private schedulesService: SchedulesService,
    private loader: LoaderService,
    private changes: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loader.showSpinner();

    this.schedulesService.getSalary()?.subscribe({
      next: (res) => {
        this.salary = res;
        this.changes.detectChanges();
      },
      error: catchError,
      complete: () => this.loader.hideSpinner(),
    });
  }

  isCoach = this.authService.isCoach();
}
