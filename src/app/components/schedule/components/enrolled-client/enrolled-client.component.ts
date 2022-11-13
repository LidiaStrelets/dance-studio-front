import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/components/user/services/users.service';
import { User } from 'src/app/components/user/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-enrolled-client',
  templateUrl: './enrolled-client.component.html',
  styleUrls: ['./enrolled-client.component.scss'],
})
export class EnrolledClientComponent implements OnInit {
  @Input() client?: User;

  avatar = `${environment.basicUrl}no_photo.webp`;

  constructor(private usersServoce: UsersService) {}

  ngOnInit() {}

  getName = this.client && this.usersServoce.getUserName(this.client);
}
