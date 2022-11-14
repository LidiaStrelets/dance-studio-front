import { Component, OnInit } from '@angular/core';
import {
  User,
  UserDeletedFields,
  UserForm,
  UserFormFields,
  UserRequest,
} from '@userModule/types';
import { UsersService } from '@userModule/services/users.service';
import { AuthService } from '@authModule/services/auth.service';
import { AlertService } from '@services/alert.service';
import { FormService } from '@services/form.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { LanguageService } from '@services/language.service';
import { LoaderService } from '@services/loader.service';
import { DateService } from '@services/date.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: User = {} as User;
  userForm: UserForm = {} as UserForm;
  userFormFields = UserFormFields;

  showDate = false;
  showName = false;
  showInfo = false;

  cleanedField = false;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private alertService: AlertService,
    private dateService: DateService,
    private formFunctionsServise: FormService,
    private languageService: LanguageService,
    private loader: LoaderService
  ) {
    this.userForm = new FormGroup({
      [UserFormFields.birth_date]: new FormControl(
        this.dateService.convertForPicker(this.dateService.defaultDate)
      ),
      [UserFormFields.firstname]: new FormControl('', Validators.required),
      [UserFormFields.lastname]: new FormControl('', Validators.required),
      [UserFormFields.information]: new FormControl(),
      [UserFormFields.photo]: new FormControl(),
    });
  }

  ngOnInit() {
    this.loader.showSpinner();
    this.usersService.getById()?.subscribe({
      next: (res) => {
        this.user = res;
        this.setInitialValues(this.user);
        this.loader.hideSpinner();
      },
      error: (err) => {
        this.loader.hideSpinner();
        catchError(err);
      },
    });
  }

  setInitialValues(user: User) {
    this.userForm.patchValue({
      [UserFormFields.firstname]: user.firstname,
      [UserFormFields.lastname]: user.lastname,
      [UserFormFields.birth_date]: user.birth_date
        ? this.dateService.convertForPicker(user.birth_date)
        : this.dateService.convertForPicker(this.dateService.defaultDate),
      [UserFormFields.information]: user.information,
    });
  }

  getBirthDate = () => {
    const date = this.userForm.get(UserFormFields.birth_date)?.value;

    if (
      date === this.dateService.convertForPicker(this.dateService.defaultDate)
    ) {
      return null;
    }

    return date;
  };

  getUserName = () =>
    `${this.userForm.get(UserFormFields.firstname)?.value} ${
      this.userForm.get(UserFormFields.lastname)?.value
    }`;

  toggleShowDate = () => {
    this.showDate = !this.showDate;
  };

  toggleName = () => {
    this.showName = !this.showName;
  };

  toggleInfo = () => {
    this.showInfo = !this.showInfo;
  };

  clean(field: UserDeletedFields) {
    if (field === UserFormFields.photo) {
      this.user.photo = null;
    }

    this.userForm.controls[field].reset();
    this.cleanedField = true;
    this.closeAll();
  }

  closeAll = () => {
    this.showDate = false;
    this.showInfo = false;
    this.showName = false;
  };

  handlePhoto = (avatar: File) => {
    this.user.photo = URL.createObjectURL(avatar);
    this.userForm.patchValue({ photo: avatar });
    this.userForm.get('photo')?.markAsDirty();
  };

  formHasChanges = () =>
    this.userForm.dirty ||
    this.userForm.get(UserFormFields.photo)?.value ||
    this.cleanedField;

  submitPatch = () => {
    if (
      !this.formHasChanges() ||
      this.userForm.invalid ||
      !this.authService.getCurrentUserId()
    ) {
      return;
    }
    const keys: UserFormFields[] = Object.keys(
      this.userForm.value
    ) as UserFormFields[];

    const requestObject = keys.reduce((requestObject, key) => {
      const fieldDalue = this.userForm.get(key);
      if (fieldDalue?.dirty) {
        requestObject[key] = fieldDalue.value;
      }
      return requestObject;
    }, {} as UserRequest);
    this.loader.showSpinner();
    this.closeAll();

    this.usersService
      .patch(this.authService.getCurrentUserId() ?? '', requestObject)
      ?.subscribe({
        next: (res) => {
          this.alertService.presentAlertSuccess(
            this.alertService.getTranslations().userSuccessMessage
          );

          this.user = res.user;
          this.cleanedField = false;
          this.userForm.reset();
          this.setInitialValues(this.user);

          this.loader.hideSpinner();
        },
        error: (err) => {
          this.loader.hideSpinner();
          catchError(err);
        },
      });
  };

  getValidation = this.formFunctionsServise.getValidation;
  getErrors = this.formFunctionsServise.getErrors;

  inputStyles = this.formFunctionsServise.inputStyles;

  isUk = this.languageService.isUk;
}
