import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { AlertService } from '@services/alert.service';
import { DateService } from '@services/date.service';
import { LoaderService } from '@services/loader.service';
import { Payment, SubscriptionOptions } from '@paymentsModule/types';
import { PricesService } from '@pricesModule/services/prices.service';
import { PaymentsService } from '@paymentsModule/services/payments.service';
import { Price } from '@pricesModule/types';
import { LanguageService } from '@services/language.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
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
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.loader.showSpinner();

    this.paymentsService.get()?.subscribe({
      next: (res) => {
        this.payments = res;
      },
      error: catchError,
    });

    this.pricesService.get()?.subscribe({
      next: (res) => {
        this.prices = res;
        this.selectOptions = res.map((price) =>
          this.languageService.translateClassesAmount(price)
        );
      },
      error: catchError,
    });

    this.loader.hideSpinner();
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
        this.payments.push(res);
        this.selectedSubscription = undefined;
        this.loader.hideSpinner();
        this.alertService.presentAlertSuccess(
          this.alertService.getTranslations().paymentSuccessMessage
        );
      },
      error: (err) => {
        this.loader.hideSpinner();
        catchError(err);
      },
    });
  };

  getExpirationDate = (createdAt: Date) => {
    const expDateMs =
      createdAt.getTime() + this.dateService.getEnrollmentValidity();

    return this.dateService.convertForPicker(new Date(expDateMs).toISOString());
  };

  isExpiring = (createdAt: Date) => {
    return (
      new Date(this.getExpirationDate(createdAt)).getTime() -
        createdAt.getTime() <
      this.dateService.getAlmostExpired()
    );
  };
}
