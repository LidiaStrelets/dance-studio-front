import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private translatedMessages = { '500': '', '403': '', '1': '' };

  constructor(private translate: TranslateService) {
    Object.keys(this.translatedMessages).forEach((message) => {
      this.translate.get(`alert.errors.${message}`).subscribe((res) => {
        this.translatedMessages[
          message as keyof { '500': ''; '403': ''; '1': '' }
        ] = res;
      });
    });
  }

  public generateMessage(message: string, status: number) {
    if (status === 403) {
      return this.translatedMessages[status.toString() as '403'];
    }
    if (status === 500) {
      return this.translatedMessages[status.toString() as '500'];
    }
    if (status === 1) {
      return this.translatedMessages[status.toString() as '1'];
    }
    return message;
  }
}
