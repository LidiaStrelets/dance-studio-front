import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  User,
  UserDeletedFields,
  UserFormFields,
  UserRequest,
} from '@userModule/types/types';
import { UsersService } from '@userModule/services/users.service';
import { AuthService } from '@authModule/services/auth.service';
import { AlertService } from '@services/alert.service';
import { FormService } from '@services/form.service';
import { Validators, FormBuilder } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { LanguageService } from '@services/language.service';
import { LoaderService } from '@services/loader.service';
import { FormatDatePipe } from '@pipes/format-date.pipe';
import { StylesObject } from '@authModule/types/types';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage implements OnInit {
  private user: User = {} as User;
  private photoFile!: File | null;

  public userForm;
  public userFormFields = UserFormFields;
  public tempPhoto: string | null = null;
  public inputStyles!: StylesObject;
  public isUk!: boolean;
  public firstnameField;
  public lastnameField;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private alertService: AlertService,
    private transformDate: FormatDatePipe,
    private formFunctionsServise: FormService,
    private languageService: LanguageService,
    private loader: LoaderService,
    private changes: ChangeDetectorRef,
    private builder: FormBuilder
  ) {
    this.userForm = this.builder.group({
      [UserFormFields.birth_date]: [''],
      [UserFormFields.firstname]: ['', Validators.required],
      [UserFormFields.lastname]: ['', Validators.required],
      [UserFormFields.information]: [''],
    });
    this.firstnameField = this.userForm.get(this.userFormFields.firstname);
    this.lastnameField = this.userForm.get(this.userFormFields.lastname);

    this.inputStyles = this.formFunctionsServise.inputStyles;
    this.isUk = this.languageService.isUk;
  }

  ngOnInit() {
    this.loader.showSpinner();
    this.usersService.getById()?.subscribe({
      next: (res) => {
        this.user = res;
        this.setInitialValues(this.user);
        if (res.photo) {
          this.tempPhoto = res.photo;
        }

        this.changes.markForCheck();
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });
  }

  private setInitialValues(user: User) {
    this.userForm.patchValue({
      [UserFormFields.firstname]: user.firstname,
      [UserFormFields.lastname]: user.lastname,
      [UserFormFields.birth_date]: user.birth_date,
      [UserFormFields.information]: user.information,
    });
    this.changes.markForCheck();
  }

  public clean(field: UserDeletedFields) {
    if (field === 'photo') {
      this.tempPhoto = null;
      this.photoFile = null;
    } else {
      this.userForm.controls[field].reset();
      this.userForm.controls[field].markAsDirty();
    }
  }

  public handlePhoto(avatar: File) {
    this.tempPhoto = URL.createObjectURL(avatar);
    this.photoFile = avatar;
  }

  // attention - function in template
  public formHasChanges() {
    return this.userForm
      ? (this.userForm.dirty &&
          (!!this.user.information != !!this.userForm.value.information ||
            this.user.firstname != this.userForm.value.firstname ||
            this.user.lastname != this.userForm.value.lastname ||
            this.transformDate.transform(this.user.birth_date ?? '', 'date') !=
              this.transformDate.transform(
                this.userForm.value.birth_date ?? '',
                'date'
              ))) ||
          !!this.photoFile ||
          (this.tempPhoto === null && !!this.user.photo)
      : false;
  }

  public submitPatch() {
    if (
      !this.formHasChanges ||
      this.userForm.invalid ||
      !this.authService.getCurrentUserId()
    ) {
      return;
    }

    const requestObject = {} as UserRequest;

    if (
      this.userForm.get(this.userFormFields.firstname)?.value &&
      this.userForm.get(this.userFormFields.firstname)?.dirty
    ) {
      requestObject[this.userFormFields.firstname] = this.userForm.get(
        this.userFormFields.firstname
      )?.value!;
    }
    if (
      this.userForm.get(this.userFormFields.lastname)?.value &&
      this.userForm.get(this.userFormFields.lastname)?.dirty
    ) {
      requestObject[this.userFormFields.lastname] = this.userForm.get(
        this.userFormFields.lastname
      )?.value!;
    }
    if (
      this.userForm.get(this.userFormFields.information)?.value &&
      this.userForm.get(this.userFormFields.information)?.dirty
    ) {
      requestObject[this.userFormFields.information] = this.userForm.get(
        this.userFormFields.information
      )?.value!;
    }
    requestObject[this.userFormFields.birth_date] = this.userForm.get(
      this.userFormFields.birth_date
    )?.value;
    requestObject.photo = this.photoFile;

    this.loader.showSpinner();

    this.usersService
      .patch(this.authService.getCurrentUserId() ?? '', requestObject)
      ?.subscribe({
        next: (res) => {
          this.alertService.presentAlertSuccess(
            this.alertService.getTranslations().userSuccessMessage
          );

          this.user = res.user;
          this.userForm.reset();
          this.photoFile = null;
          this.setInitialValues(this.user);

          this.changes.markForCheck();
        },
        error: (err) => {
          catchError(err);
          this.loader.hideSpinner();
        },
        complete: () => this.loader.hideSpinner(),
      });
  }

  // attention function in template
  // public getValidation = this.formFunctionsServise.getValidation;
  // public getErrors = this.formFunctionsServise.getErrors;
}
