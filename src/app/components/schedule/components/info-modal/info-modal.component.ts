import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/language.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SingleScheduleFull } from './../../types';
import { EnrollmentsService } from '../../../enrollments/services/enrollments.service';
import { UsersService } from '../../../user/services/users.service';
import { SchedulesService } from '../../services/schedules.service';
import { User } from 'src/app/components/user/types';
import { Registration } from 'src/app/components/enrollments/types';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit {
  enrollments: Registration[] = [];
  allUsers: User[] = [];
  item = new BehaviorSubject<SingleScheduleFull | undefined>(undefined);

  constructor(
    private userService: UsersService,
    private languageService: LanguageService,
    private enrollmentsService: EnrollmentsService,
    private loader: LoaderService,
    private location: Location,
    private route: ActivatedRoute,
    private scheduleService: SchedulesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async (res) => {
      this.loader.showSpinner();
      const scheduleId = res.get('id');

      if (!scheduleId) {
        // show error
        return;
      }
      this.scheduleService.getById(scheduleId)?.subscribe({
        next: (res) => {
          this.item.next(res);
        },
        error: catchError,
      });

      this.item.subscribe((res) => {
        if (res) {
          this.enrollmentsService.getBySchedule(res.id)?.subscribe({
            next: (res) => {
              this.enrollments = res;
            },
            error: (err) => {
              catchError(err);
            },
          });
        }
      });

      await setTimeout(() => {
        this.allUsers = this.userService.getUsers();
      }, 1000);

      this.loader.hideSpinner();
    });
  }

  isUk = this.languageService.isUk;

  findUser = (id: string) => this.allUsers.find((user) => user.id === id);

  backToSchedule = () => {
    this.location.back();
  };
}
