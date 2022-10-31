import { Component, Input, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/language.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ClassItemFull, Registration, Schedule, User } from 'src/types';
import { ClassesService } from '../../../classes/services/classes.service';
import { EnrollmentsService } from '../../../enrollments/services/enrollments.service';
import { UsersService } from '../../../user/services/users.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit {
  @Input() item: Schedule = {} as Schedule;
  presentingElement: Element | null = null;
  coach: User = {} as User;
  classItem: ClassItemFull = {} as ClassItemFull;
  enrollments: Registration[] = [];
  allUsers: User[] = [];

  constructor(
    private userService: UsersService,
    private classesService: ClassesService,
    private languageService: LanguageService,
    private enrollmentsService: EnrollmentsService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.loader.showSpinner();

    this.presentingElement = document.querySelector('.ion-page');

    this.allUsers = this.userService.getUsers();
    this.coach =
      this.allUsers.find((user) => user.id === this.item.coach_id) ??
      ({} as User);

    this.classesService.getById(this.item.class_id).subscribe({
      next: (res) => {
        this.classItem = res;
        this.loader.hideSpinner();
      },
      error: catchError,
    });

    this.loader.showSpinner();
    this.enrollmentsService.getBySchedule(this.item.id).subscribe({
      next: (res) => {
        this.enrollments = res;
        this.loader.hideSpinner();
      },
      error: catchError,
    });
  }

  isUk = this.languageService.isUk;

  findUser = (id: string) => this.allUsers.find((user) => user.id === id);
}
