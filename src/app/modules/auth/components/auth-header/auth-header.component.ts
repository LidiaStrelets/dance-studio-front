import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthHeaderComponent implements OnInit {
  @Input()
  link: string[] = [];
  @Input()
  linkName = '';

  constructor() {}

  ngOnInit() {}
}
