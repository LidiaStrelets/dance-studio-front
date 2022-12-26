import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { environment } from '@root/environments/environment';
import { UserDeletedFields } from '@userModule/types/types';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
  @Input()
  userPhoto?: string | null;

  @Output()
  onPhoto = new EventEmitter<File>();
  @Output()
  onClear = new EventEmitter<UserDeletedFields>();

  public avatar = `${environment.basicUrl}no_photo.webp`;

  constructor() {}

  ngOnInit() {}

  public handlePhoto(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const avatar = files[0];

      this.onPhoto.emit(avatar);
    }
  }

  public handleClear() {
    this.onClear.emit('photo');
  }
}
