import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PersonalsService } from '@personalsModule/services/personals.service';

import { PaymentComponent } from '@personalsModule/components/payment/payment.component';
// timeout error
describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  const personalsSpy = jasmine.createSpyObj<PersonalsService>(['update']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentComponent],
      providers: [{ provide: PersonalsService, useValue: personalsSpy }],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
