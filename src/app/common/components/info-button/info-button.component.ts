import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-button',
  templateUrl: './info-button.component.html',
  styleUrls: ['./info-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoButtonComponent implements OnInit {
  @Input()
  navigateTo: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {}

  public toInfo() {
    this.router.navigate(this.navigateTo);
  }
}
