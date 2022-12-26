import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CoachesPage } from '@coachesModule/coaches.page';
import { TranslateModule } from '@ngx-translate/core';
import { UsersService } from '@userModule/services/users.service';
import { SwiperModule } from 'swiper/angular';

describe('CoachesPage', () => {
  let component: CoachesPage;
  let fixture: ComponentFixture<CoachesPage>;

  const usersServiceSpy = jasmine.createSpyObj<UsersService>(['getCoaches']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CoachesPage],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot(), SwiperModule],
      providers: [{ provide: UsersService, useValue: usersServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CoachesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
