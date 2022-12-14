import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from '@authModule/services/auth.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PersonalsPage } from '@personalsModule/personals.page';
import { EnrollComponent } from './components/enroll/enroll.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PersonalsService } from './services/personals.service';
// timeout error
describe('PersonalsPage', () => {
  let component: PersonalsPage;
  let fixture: ComponentFixture<PersonalsPage>;

  const personalsSpy = jasmine.createSpyObj<PersonalsService>(['getByUser']);
  const authSpy = jasmine.createSpyObj<AuthService>(['getCurrentUserId']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PersonalsService, useValue: personalsSpy },
        { provide: AuthService, useValue: authSpy },
      ],
      declarations: [PersonalsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
