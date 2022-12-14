import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoachClassesPage } from '@coachClassesModule/coach-classes.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { AuthService } from '@authModule/services/auth.service';
import { SwiperModule } from 'swiper/angular';

// timeout error
describe('CoachClassesPage', () => {
  let component: CoachClassesPage;
  let fixture: ComponentFixture<CoachClassesPage>;

  const enrollmentsServiceSpy = jasmine.createSpyObj<EnrollmentsService>([
    'getByDateAndCoachMapped',
  ]);
  const personalsServiceSpy = jasmine.createSpyObj<PersonalsService>([
    'getByCoachAndDate',
  ]);
  const authServiceSpy = jasmine.createSpyObj<AuthService>([
    'getCurrentUserId',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CoachClassesPage],
      imports: [IonicModule.forRoot(), SwiperModule, TranslateModule.forRoot()],
      providers: [
        { provide: EnrollmentsService, useValue: enrollmentsServiceSpy },
        { provide: PersonalsService, useValue: personalsServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoachClassesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
