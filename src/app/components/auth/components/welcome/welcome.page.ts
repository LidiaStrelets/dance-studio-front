import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
export class WelcomePage implements OnInit {
  show = false;
  link = routesPaths.login;

  constructor(
    private authService: AuthService,
    private changes: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.redirectAuthenticated();
    setTimeout(() => {
      this.show = true;
      this.changes.markForCheck();
    }, 300);
  }
}
