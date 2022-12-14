import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UsersService } from '@userModule/services/users.service';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  const usersServiceSpy = jasmine.createSpyObj<UsersService>(['getById']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserCardComponent],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
      providers: [{ provide: UsersService, useValue: usersServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
