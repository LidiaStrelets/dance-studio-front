import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ErrorMessages, ReturnErrorMessages } from '@app/common/types/types';
import { RegistrationFormFields } from '@authModule/types/types';
import { TranslateService } from '@ngx-translate/core';
import { PersonalFormFields } from '@personalsModule/types/types';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorsComponent implements OnInit, OnChanges {
  @Input()
  errors?: ValidationErrors | null = {} as ValidationErrors;
  @Input()
  field?: RegistrationFormFields | PersonalFormFields;

  private customErrors: ErrorMessages = {} as ErrorMessages;
  public returnErrors: ReturnErrorMessages = {} as ReturnErrorMessages;

  constructor(private translateService: TranslateService) {
    this.customErrors.pattern = { password: '', duration: '' };
    this.translateService.get('errors').subscribe((res) => {
      this.customErrors.required = res['required'];
      this.customErrors.pattern!.password = res['pattern']['password'];
      this.customErrors.pattern!.duration = res['pattern']['duration'];
      this.customErrors.email = res['email'];
      this.customErrors.min = res['min'];
      this.customErrors.max = res['max'];
      this.customErrors.keyRequired = res['keyRequired'];
    });
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'errors' && value) {
        if (value['required']) {
          this.returnErrors.required = this.customErrors.required;
        }
        if (value['pattern']) {
          if (this.field === RegistrationFormFields.password) {
            this.returnErrors.pattern = this.customErrors.pattern?.password!;
          }
          if (this.field === PersonalFormFields.duration) {
            this.returnErrors.pattern = this.customErrors.pattern?.duration!;
          }
        }
        if (value['email']) {
          this.returnErrors.email = this.customErrors.email;
        }
        if (value['min']) {
          this.returnErrors.min = this.customErrors.min;
        }
        if (value['max']) {
          this.returnErrors.max = this.customErrors.max;
        }
        if (
          (this.field = RegistrationFormFields.adminKey && value['keyRequired'])
        ) {
          this.returnErrors.keyRequired = this.customErrors.keyRequired;
        }

        console.log('changes', this.errors, this.customErrors);
      }
    }
  }
}
