import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { IonicModule } from '@ionic/angular';
import { ItemButtonsComponent } from '@schedulesModule/components/item-buttons/item-buttons.component';
import { AlertService } from '@services/alert.service';

describe('ItemButtonsComponent', () => {
  let component: ItemButtonsComponent;
  let fixture: ComponentFixture<ItemButtonsComponent>;

  const enrollmentsSpy = jasmine.createSpyObj<EnrollmentsService>(['enroll']);
  const alertSpy = jasmine.createSpyObj<AlertService>([
    'presentAlertSuccess',
    'getTranslations',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItemButtonsComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: EnrollmentsService, useValue: enrollmentsSpy },
        { provide: AlertService, useValue: alertSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
