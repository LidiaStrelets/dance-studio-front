import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { UsersService } from '@userModule/services/users.service';

import { StatusCreatedComponent } from './status-created.component';
// timeout error
describe('StatusCreatedComponent', () => {
  let component: StatusCreatedComponent;
  let fixture: ComponentFixture<StatusCreatedComponent>;

  const usersServiceSpy = jasmine.createSpyObj<UsersService>(['getById']);
  const personalsServiceSpy = jasmine.createSpyObj<PersonalsService>([
    'update',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StatusCreatedComponent],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: PersonalsService, useValue: personalsServiceSpy },
      ],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
