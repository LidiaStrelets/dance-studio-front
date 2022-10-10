import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  show = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.redirectAuthenticated();
    setTimeout(() => (this.show = true), 300);
  }
}
