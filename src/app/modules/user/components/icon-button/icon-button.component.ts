import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UserDeletedFields } from '@userModule/types/types';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent implements OnInit {
  @Input()
  cleanAllowed?: UserDeletedFields;

  @Output()
  cleanItem = new EventEmitter<UserDeletedFields>();

  public show = false;

  constructor(private location: Location, private changes: ChangeDetectorRef) {
    this.location.onUrlChange(() => {
      this.show = false;
      changes.markForCheck();
    });
  }

  ngOnInit() {}

  public onClean() {
    this.cleanItem.emit(this.cleanAllowed);
  }

  public toggle() {
    this.show = !this.show;
  }
}
