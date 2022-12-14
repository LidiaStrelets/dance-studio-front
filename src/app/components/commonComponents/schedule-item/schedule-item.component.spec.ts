import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from '@authModule/services/auth.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ScheduleItemComponent } from './schedule-item.component';

describe('ScheduleItemComponent', () => {
  let component: ScheduleItemComponent;
  let fixture: ComponentFixture<ScheduleItemComponent>;

  const authSpy = jasmine.createSpyObj<AuthService>(['isCoach']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleItemComponent],
      providers: [{ provide: AuthService, useValue: authSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
