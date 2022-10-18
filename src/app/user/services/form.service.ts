import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserForm } from 'src/types';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private userForm: UserForm = {} as UserForm;

  constructor(private dateService: DateService) {
    this.userForm = new FormGroup({
      birth_date: new FormControl(
        this.dateService.convertForPicker(new Date('2000-12-12'))
      ),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      information: new FormControl(),
      photo: new FormControl(),
    });
  }

  getForm = () => this.userForm;

  setInitialValues(user: User) {
    this.userForm.patchValue({
      firstname: user.firstname,
      lastname: user.lastname,
      birth_date: user.birth_date
        ? this.dateService.convertForPicker(new Date(user.birth_date))
        : this.dateService.convertForPicker(new Date('2000-12-12')),
      information: user.information,
    });
  }
}
