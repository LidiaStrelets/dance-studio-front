import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EAlertTranslation, Error } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private translate: TranslateService) {}

  getTranslation = () => {
    let message = '';
    this.translate
      .get(`alert.${EAlertTranslation.serverErrorMessage}`)
      .subscribe((res) => (message = res));

    return message;
  };
  generateMessage(err: Error) {
    return err.error ? err.error[0].message : this.getTranslation();
  }
}
