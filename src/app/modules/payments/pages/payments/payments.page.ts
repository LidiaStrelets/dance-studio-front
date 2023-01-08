import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { catchError, Subscription } from 'rxjs';
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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsPage implements OnInit, OnDestroy {
  private subscription?: Subscription;

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
    private changes: ChangeDetectorRef,
    private route: ActivatedRoute
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

        this.subscription = this.route.paramMap.subscribe((res) => {
          const priceId = res.get('priceId');
          if (priceId) {
            this.selectedPrice = this.prices.find(({ id }) => id === priceId)!;
          }
        });
        this.changes.markForCheck();
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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
