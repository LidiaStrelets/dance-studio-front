import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeaderComponent } from '@commonComponents/header/header.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SchedulePage } from '@schedulesModule/pages/schedules/schedule.page';
import { SwiperModule } from 'swiper/angular';
import { ClassScheduleComponent } from '@schedulesModule/components/class-schedule/class-schedule.component';
import { CoachScheduleComponent } from '@schedulesModule/components/coach-schedule/coach-schedule.component';
import { DateScheduleComponent } from '@schedulesModule/components/date-schedule/date-schedule.component';
import { InfoModalComponent } from '@schedulesModule/components/info-modal/info-modal.component';
import { SchedulesService } from '@schedulesModule/services/schedules.service';

describe('SchedulePage', () => {
  let component: SchedulePage;
  let fixture: ComponentFixture<SchedulePage>;

  const schedulesSpy = jasmine.createSpyObj<SchedulesService>([
    'create',
    'get',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SchedulePage,
        DateScheduleComponent,
        CoachScheduleComponent,
        ClassScheduleComponent,
        InfoModalComponent,
        HeaderComponent,
      ],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        SwiperModule,
        HttpClientTestingModule,
      ],
      providers: [{ provide: SchedulesService, useValue: schedulesSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
