import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@authModule/services/auth.service';
import { HeaderComponent } from '@commonComponents/header/header.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserPage } from '@userModule/user.page';
import { AvatarComponent } from './components/avatar/avatar.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { UsersService } from './services/users.service';

describe('UserPage', () => {
  let component: UserPage;
  let fixture: ComponentFixture<UserPage>;

  const usersSpy = jasmine.createSpyObj<UsersService>(['getById']);
  const authSpy = jasmine.createSpyObj<AuthService>(['getCurrentUserId']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        ReactiveFormsModule,
      ],
      providers: [
        { provide: UsersService, useValue: usersSpy },
        { provide: AuthService, useValue: authSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
