import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassesService } from '@classesModule/services/classes.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ClassScheduleComponent } from '@schedulesModule/components/class-schedule/class-schedule.component';
import { SchedulesService } from '@schedulesModule/services/schedules.service';

describe('ClassScheduleComponent', () => {
  let component: ClassScheduleComponent;
  let fixture: ComponentFixture<ClassScheduleComponent>;

  const classesSpy = jasmine.createSpyObj<ClassesService>(['getClasses']);
  const schedulesSpy = jasmine.createSpyObj<SchedulesService>(['getWeek']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClassScheduleComponent],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: ClassesService, useValue: classesSpy },
        { provide: SchedulesService, useValue: schedulesSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
