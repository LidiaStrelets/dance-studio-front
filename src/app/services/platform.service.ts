import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private isIos = false;
  constructor() {
    Device.getInfo().then(
      (info) =>
        (this.isIos = info.platform === 'ios' || info.operatingSystem === 'ios')
    );
  }

  isPlatformIos = () => this.isIos;
}
