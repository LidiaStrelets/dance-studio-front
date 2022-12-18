import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TokenInterceptorService } from '@services/token-interceptor.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorCatchingInterceptor } from '@interceptors/httpError.interceptor';
import { AlertService } from '@services/alert.service';
import { ErrorService } from '@services/error.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@authModule/services/auth.service';
import { FilterMenuPipe } from './pipes/filter-menu.pipe';
import { ZoneTimePipe } from './pipes/zone-time.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';

export const httpLoaderFactory = (httpClient: HttpClient) =>
  new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent, FilterMenuPipe],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxSpinnerModule.forRoot({ type: 'ball-atom' }),
    BrowserAnimationsModule,
  ],
  providers: [
    ZoneTimePipe,
    FormatDatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true,
      deps: [AlertService, ErrorService, AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
