import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ErrorMessages } from '@app/types';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorsComponent implements OnInit {
  @Input() errors: ErrorMessages = {} as ErrorMessages;
  constructor() {}

  ngOnInit() {}
}
