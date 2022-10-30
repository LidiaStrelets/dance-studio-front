import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
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

  constructor(
    private userService: UsersService,
    private classesService: ClassesService,
    private languageService: LanguageService,
    private enrollmentsService: EnrollmentsService
  ) {}

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');

    this.userService.getById(this.item.coach_id).subscribe({
      next: (res) => (this.coach = res),
      error: (err) => console.log('error', err),
    });

    this.classesService.getById(this.item.class_id).subscribe({
      next: (res) => (this.classItem = res),
      error: (err) => console.log('error', err),
    });

    this.enrollmentsService.getBySchedule(this.item.id).subscribe({
      next: (res) => (this.enrollments = res),
      error: (err) => console.log('error', err),
    });
  }

  isUk = this.languageService.isUk;
}
