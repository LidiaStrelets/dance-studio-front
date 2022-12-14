import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterPage } from '@authModule/components/register/register.page';
import { TranslateModule } from '@ngx-translate/core';
import { BeService } from '@authModule/services/register.services/be.service';
import { AuthService } from '@authModule/services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { ErrorsComponent } from '../errors/errors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  const beServiceSpy = jasmine.createSpyObj<BeService>(['register']);
  const authServiceSpy = jasmine.createSpyObj<AuthService>([
    'authenticate',
    'redirectAuthenticated',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: BeService, useValue: beServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
