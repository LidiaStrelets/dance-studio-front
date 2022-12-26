import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentsPage } from '@paymentsModule/pages/payments/payments.page';
import { PricesService } from '@pricesModule/services/prices.service';
import { PaymentsService } from '@paymentsModule/services/payments.service';

describe('PaymentsPage', () => {
  let component: PaymentsPage;
  let fixture: ComponentFixture<PaymentsPage>;

  const paymentsSpy = jasmine.createSpyObj<PaymentsService>(['get']);
  const pricesSpy = jasmine.createSpyObj<PricesService>(['get']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsPage],
      providers: [
        { provide: PaymentsService, useValue: paymentsSpy },
        { provide: PricesService, useValue: pricesSpy },
      ],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
