import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { Price } from 'src/types';
import { PricesService } from './services/prices.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.page.html',
  styleUrls: ['./prices.page.scss'],
})
export class PricesPage implements OnInit {
  prices: Price[] = [];

  constructor(
    private pricesService: PricesService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.loader.showSpinner();

    this.pricesService.get().subscribe({
      next: (res) => {
        this.prices = res;
        this.loader.hideSpinner();
      },
      error: catchError,
    });
  }
}
