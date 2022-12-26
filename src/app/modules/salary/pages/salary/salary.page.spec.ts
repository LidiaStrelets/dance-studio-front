import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from '@authModule/services/auth.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SchedulesService } from '@schedulesModule/services/schedules.service';
import { SalaryPage } from '@salaryModule/pages/salary/salary.page';

describe('SalaryPage', () => {
  let component: SalaryPage;
  let fixture: ComponentFixture<SalaryPage>;

  const authSpy = jasmine.createSpyObj<AuthService>(['isCoach']);
  const schedulesSpy = jasmine.createSpyObj<SchedulesService>(['getSalary']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: SchedulesService, useValue: schedulesSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [SalaryPage],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
