import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { routesPaths } from '@app/app-routing.module';
import { AuthService } from '@authModule/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePage implements OnInit, OnDestroy {
  private timeoutId;

  public show = false;
  public link = routesPaths.login;

  constructor(
    private authService: AuthService,
    private changes: ChangeDetectorRef
  ) {
    this.authService.redirectAuthenticated();
    this.timeoutId = setTimeout(() => {
      this.show = true;
      this.changes.markForCheck();
    }, 300);
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }
}
