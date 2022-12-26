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
import {
  PaymentWithExiring,
  SubscriptionOption,
} from '@paymentsModule/types/types';
import { PricesService } from '@pricesModule/services/prices.service';
import { PaymentsService } from '@paymentsModule/services/payments.service';
import { LanguageService } from '@services/language.service';
import { GetExpirationDatePipe } from '@paymentsModule/pipes/get-expiration-date.pipe';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsPage implements OnInit {
  public prices: SubscriptionOption[] = [];
  public payments: PaymentWithExiring[] = [];
  public selectedSubscription = '';
  public selectedPrice = {} as SubscriptionOption;

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
        this.payments = res.map((payment) => ({
          ...payment,
          isExpiring: this.isExpiring(payment.createdAt),
        }));

        this.changes.markForCheck();
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
        this.prices = res.map((price) =>
          this.languageService.translateClassesAmount(price)
        );
        this.changes.markForCheck();
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });
  }

  private isExpiring(createdAt: string) {
    const expirationDate = this.toExpirationDtae.transform(createdAt);
    return (
      new Date(expirationDate).getTime() - new Date(createdAt).getTime() <
      this.dateService.getAlmostExpired()
    );
  }

  public handleBuy(classes: number) {
    const price = this.prices.find((price) => price.classes_amount === classes);
    if (!price) {
      return;
    }
    this.loader.showSpinner();
    this.paymentsService.create(price.id)?.subscribe({
      next: (res) => {
        this.payments = [
          ...this.payments,
          { ...res, isExpiring: this.isExpiring(res.createdAt) },
        ];
        this.selectedSubscription = '';
        this.alertService.presentAlertSuccess(
          this.alertService.getTranslations().paymentSuccessMessage
        );
        this.changes.markForCheck();
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });
  }

  public setPrice(price_id: string) {
    this.selectedPrice = this.prices.find(({ id }) => id === price_id)!;
  }
}
