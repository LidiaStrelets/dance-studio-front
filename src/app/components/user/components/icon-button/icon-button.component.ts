import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent implements OnInit {
  @Input() toggle: VoidFunction = () => {};
  @Input() show = false;
  @Input() cleanAllowed?: string;

  @Output() cleanItem = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onClean = () => {
    this.cleanItem.emit(this.cleanAllowed);
  };
}
