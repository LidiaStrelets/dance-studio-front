import { Component, OnInit } from '@angular/core';
import { AuthService } from '@authModule/services/auth.service';
import { SchedulesService } from '@schedulesModule/services/schedules.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.page.html',
  styleUrls: ['./salary.page.scss'],
})
export class SalaryPage implements OnInit {
  salary = 0;
  constructor(
    private authService: AuthService,
    private schedulesService: SchedulesService
  ) {}

  ngOnInit() {
    this.schedulesService.getSalary()?.subscribe({
      next: (res) => (this.salary = res),
      error: (err) => console.log('err', err),
    });
  }

  isCoach = this.authService.isCoach();
}
