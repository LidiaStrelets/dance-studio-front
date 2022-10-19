import { Component, OnInit } from '@angular/core';
import { routesPaths } from 'src/app/app-routing.module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  show = false;
  link = routesPaths.login;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.redirectAuthenticated();
    setTimeout(() => (this.show = true), 300);
  }
}
