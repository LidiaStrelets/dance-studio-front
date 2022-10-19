import { Component, Input, OnInit } from '@angular/core';
import { ErrorMessages } from 'src/types';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit {
  @Input() showError = false;
  @Input() errors: ErrorMessages = {} as ErrorMessages;
  constructor() {}

  ngOnInit() {}
}
