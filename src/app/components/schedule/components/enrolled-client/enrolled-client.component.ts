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
  @Input() userId = '';
  client?: User;

  avatar = `${environment.basicUrl}no_photo.webp`;

  test = false;

  constructor(private usersService: UsersService) {
    this.usersService.getById(this.userId).subscribe({
      next: (res) => {
        this.client = res;
        this.test = true;
        console.log(this.test, this.client);
      },
      error: (err) => console.log('error', err),
    });
  }

  ngOnInit() {}

  getName = () => {
    console.log('get name', this.client);

    return `${this.client?.firstname} ${this.client?.lastname}`;
  };
}
