import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { catchError } from 'rxjs';
import { AlertService } from '@services/alert.service';
import { DateService } from '@services/date.service';
import { LoaderService } from '@services/loader.service';
import { Payment, SubscriptionOptions } from '@paymentsModule/types';
import { PricesService } from '@pricesModule/services/prices.service';
import { PaymentsService } from '@paymentsModule/services/payments.service';
import { Price } from '@pricesModule/types';
import { LanguageService } from '@services/language.service';
import { GetExpirationDatePipe } from './pipes/get-expiration-date.pipe';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsPage implements OnInit {
  payments: Payment[] = [];
  selectOptions: SubscriptionOptions[] = [];
  selectedSubscription?: number;
  prices: Price[] = [];

  constructor(
    private paymentsService: PaymentsService,
    private loader: LoaderService,
    private pricesService: PricesService,
    private alertService: AlertService,
    private dateService: DateService,
    private languageService: LanguageService,
    private toExpirationDtae: GetExpirationDatePipe,
    private changes: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loader.showSpinner();
    this.paymentsService.get()?.subscribe({
      next: (res) => {
        this.payments = res;
        this.changes.detectChanges();
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });

    this.loader.showSpinner();
    this.pricesService.get()?.subscribe({
      next: (res) => {
        this.prices = res;
        this.selectOptions = res.map((price) =>
          this.languageService.translateClassesAmount(price)
        );
        this.changes.detectChanges();
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });
  }

  showPrice = (amount?: number) =>
    this.selectOptions.find((option) => option.value === amount)?.price;

  handleBuy = (classes: number) => {
    const price = this.prices.find((price) => price.classes_amount === classes);
    if (!price) {
      return;
    }
    this.loader.showSpinner();
    this.paymentsService.create(price.id)?.subscribe({
      next: (res) => {
        this.payments = [...this.payments, res];
        this.selectedSubscription = undefined;
        this.alertService.presentAlertSuccess(
          this.alertService.getTranslations().paymentSuccessMessage
        );
        this.changes.detectChanges();
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });
  };

  isExpiring = (createdAt: string) => {
    const expirationDate = this.toExpirationDtae.transform(createdAt);
    return (
      new Date(expirationDate).getTime() - new Date(createdAt).getTime() <
      this.dateService.getAlmostExpired()
    );
  };
}
