import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from '@authModule/services/auth.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { PersonalsPage } from '@personalsModule/pages/personals/personals.page';

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
