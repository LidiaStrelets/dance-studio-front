import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CancellButtonComponent } from '@commonComponents/cancell-button/cancell-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@services/alert.service';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';

describe('CancellButtonComponent', () => {
  let component: CancellButtonComponent;
  let fixture: ComponentFixture<CancellButtonComponent>;

  const alertServiceSpy = jasmine.createSpyObj<AlertService>([
    'presentAreYouSure',
  ]);
  const enrollmentServiceSpy = jasmine.createSpyObj<EnrollmentsService>([
    'cancell',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CancellButtonComponent],
      providers: [
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: EnrollmentsService, useValue: enrollmentServiceSpy },
      ],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CancellButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
