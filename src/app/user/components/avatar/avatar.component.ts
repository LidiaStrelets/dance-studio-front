import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input() userPhoto?: string | null;
  @Output() onPhoto = new EventEmitter<File>();
  @Output() onClear = new EventEmitter<string>();

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
    console.log('kuku');

    this.onClear.emit('photo');
  };
}