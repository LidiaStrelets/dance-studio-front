import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InfoModalComponent } from '@schedulesModule/components/info-modal/info-modal.component';
import { SchedulesService } from '@schedulesModule/services/schedules.service';
// activated route error
describe('InfoModalComponent', () => {
  let component: InfoModalComponent;
  let fixture: ComponentFixture<InfoModalComponent>;

  const enrollmentsSpy = jasmine.createSpyObj<EnrollmentsService>([
    'getBySchedule',
  ]);
  const schedulesSpy = jasmine.createSpyObj<SchedulesService>(['getById']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InfoModalComponent],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
      providers: [
        { provide: EnrollmentsService, useValue: enrollmentsSpy },
        { provide: SchedulesService, useValue: schedulesSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
