import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DateScheduleComponent } from '@schedulesModule/components/date-schedule/date-schedule.component';
import { SchedulesService } from '@schedulesModule/services/schedules.service';
import { LanguageService } from '@services/language.service';

describe('DateScheduleComponent', () => {
  let component: DateScheduleComponent;
  let fixture: ComponentFixture<DateScheduleComponent>;

  const enrollmentsSpy = jasmine.createSpyObj<EnrollmentsService>([
    'getByDate',
  ]);
  const schedulesSpy = jasmine.createSpyObj<SchedulesService>(['get']);
  const languagesServiceSpy = jasmine.createSpyObj<LanguageService>([
    'translateSchedule',
    'isUk',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DateScheduleComponent],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
      providers: [
        { provide: EnrollmentsService, useValue: enrollmentsSpy },
        { provide: SchedulesService, useValue: schedulesSpy },
        { provide: LanguageService, useValue: languagesServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DateScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
