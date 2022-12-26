import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EnrollmentsPage } from '@enrollmentsModule/pages/enrollments/enrollments.page';
import { TranslateModule } from '@ngx-translate/core';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { SwiperModule } from 'swiper/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EnrollmentsPage', () => {
  let component: EnrollmentsPage;
  let fixture: ComponentFixture<EnrollmentsPage>;

  const enrollmentsSpy = jasmine.createSpyObj<EnrollmentsService>([
    'getByDateMapped',
    'getStats',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [EnrollmentsPage],
      providers: [{ provide: EnrollmentsService, useValue: enrollmentsSpy }],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot(), SwiperModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
