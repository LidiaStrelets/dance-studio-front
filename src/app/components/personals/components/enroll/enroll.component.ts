import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { InputCustomEvent } from '@ionic/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { ClassesService } from 'src/app/components/classes/services/classes.service';
import {
  ClassItem,
  ClassItemFull,
  TClass,
} from 'src/app/components/classes/types';
import { UsersService } from 'src/app/components/user/services/users.service';
import { User } from 'src/app/components/user/types';
import { DateService } from 'src/app/services/date.service';
import { FormService } from 'src/app/services/form.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PersonalFormFields } from '../../types';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss'],
})
export class EnrollComponent implements OnInit {
  coaches: User[] = [];
  classes: ClassItemFull[] = [];
  translatedClasses: ClassItem[] = [];

  personalForm = new FormGroup({
    coach: new FormControl('', Validators.required),
    class: new FormControl<TClass | null>(null, Validators.required),
    date: new FormControl(new Date(), Validators.required),
    duration: new FormControl<number | null>(null, [
      Validators.pattern('^[0-9]*$'),
      Validators.required,
      Validators.min(60),
      Validators.max(120),
    ]),
  });
  personalFormFields = PersonalFormFields;

  showDate = false;
  selectedDate = new BehaviorSubject('');
  fieldName = 'date';

  constructor(
    private usersService: UsersService,
    private classesService: ClassesService,
    private loader: LoaderService,
    private dateService: DateService,
    private formService: FormService
  ) {}

  async ngOnInit() {
    this.loader.showSpinner();

    const observable = await this.usersService.getCoaches();
    observable?.subscribe({
      next: (res) => {
        this.coaches = res;
      },
      error: catchError,
    });

    this.classesService.getClasses()?.subscribe({
      next: (res) => {
        this.classes = res;
        this.translatedClasses = this.classesService.translateClasses(res);
      },
      error: catchError,
    });

    this.loader.hideSpinner();
  }

  getName = this.usersService.getUserName;

  getValidation = this.formService.getValidation;
  getErrors = this.formService.getErrors;
  inputStyles = this.formService.inputStyles;

  handleSubmit = () => {
    if (!this.personalForm.valid) {
      return;
    }
    console.log(this.personalForm.value);
  };

  toggleDate = (form: FormGroup) => {
    this.showDate = !this.showDate;
    if (!this.showDate) {
      this.selectedDate.next(form.get(this.fieldName)?.value ?? '');

      this.personalForm.patchValue({ date: form.get(this.fieldName)?.value });
    }
  };

  getDate = (form: FormGroup) =>
    this.dateService.getDate(form.get(this.fieldName)?.value);
}
