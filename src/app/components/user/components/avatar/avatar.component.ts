import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDeletedFields, UserFormFields } from './../../types';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input() userPhoto?: string | null;
  @Output() onPhoto = new EventEmitter<File>();
  @Output() onClear = new EventEmitter<UserDeletedFields>();

  avatar = `${environment.basicUrl}no_photo.webp`;

  constructor() {}

  ngOnInit() {}

  handlePhoto = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const avatar = files[0];

      this.onPhoto.emit(avatar);
    }
  };

  handleClear = () => {
    this.onClear.emit(UserFormFields.photo);
  };
}
