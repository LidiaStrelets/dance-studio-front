import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CoachScheduleComponent } from '@schedulesModule/components/coach-schedule/coach-schedule.component';
import { SchedulesService } from '@schedulesModule/services/schedules.service';
import { UsersService } from '@userModule/services/users.service';

describe('CoachScheduleComponent', () => {
  let component: CoachScheduleComponent;
  let fixture: ComponentFixture<CoachScheduleComponent>;

  const usersSpy = jasmine.createSpyObj<UsersService>(['getCoaches']);
  const schedulesSpy = jasmine.createSpyObj<SchedulesService>(['getWeek']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CoachScheduleComponent],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot(), FormsModule],
      providers: [
        { provide: UsersService, useValue: usersSpy },
        { provide: SchedulesService, useValue: schedulesSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoachScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
