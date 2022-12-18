import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UserDeletedFields } from '@userModule/types';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent implements OnInit {
  @Input() toggle: VoidFunction = () => {};
  @Input() show = false;
  @Input() cleanAllowed?: UserDeletedFields;

  @Output() cleanItem = new EventEmitter<UserDeletedFields>();

  constructor() {}

  ngOnInit() {}

  onClean = () => {
    this.cleanItem.emit(this.cleanAllowed);
  };
}
