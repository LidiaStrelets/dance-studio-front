import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/types';
import { UsersService } from '../../../user/services/users.service';

@Component({
  selector: 'app-enrolled-client',
  templateUrl: './enrolled-client.component.html',
  styleUrls: ['./enrolled-client.component.scss'],
})
export class EnrolledClientComponent implements OnInit {
  @Input() client?: User;

  avatar = `${environment.basicUrl}no_photo.webp`;

  constructor() {}

  ngOnInit() {}

  getName = () => `${this.client?.firstname} ${this.client?.lastname}`;
}
