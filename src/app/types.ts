import { FormGroup, ValidationErrors } from '@angular/forms';
import { TRegistrationFormFields } from './components/auth/types';

export interface MenuItem {
  name: string;
  translatedName: string;
  link: string[];
  id: number;
}

export enum LocalStorageKeys {
  language = 'language',
  token = 'token',
}

export type ValidationFunction = (
  field: TRegistrationFormFields,
  form: FormGroup
) => {
  blockHighlight: boolean | undefined;
  showMessage: boolean | undefined;
};

export type ErrorFunction = (
  field: TRegistrationFormFields,
  form: FormGroup
) => ValidationErrors;

export interface AlertTranslation {
  oopsHeader: string;
  okButton: string;
  completedHeader: string;
  unauthorizedHeader: string;
  unauthorizedMesage: string;
  userSuccessMessage: string;
  enrollmentSuccessMessage: string;
  enrollmentCancellMessage: string;
  paymentSuccessMessage: string;
  enrollmentCancellConfirmation: string;
  cancellButton: string;
  confirmationHeader: string;
}

export enum EAlertTranslation {
  oopsHeader = 'oopsHeader',
  okButton = 'okButton',
  confirmationHeader = 'confirmationHeader',
  cancellButton = 'cancellButton',
  completedHeader = 'completedHeader',
  unauthorizedHeader = 'unauthorizedHeader',
  unauthorizedMesage = 'unauthorizedMesage',
  userSuccessMessage = 'userSuccessMessage',
  enrollmentSuccessMessage = 'enrollmentSuccessMessage',
  enrollmentCancellMessage = 'enrollmentCancellMessage',
  paymentSuccessMessage = 'paymentSuccessMessage',
  enrollmentCancellConfirmation = 'enrollmentCancellConfirmation',
}

export interface ErrorMessages {
  required: string;
  pattern: string;
  email: string;
  keyRequired: string;
}
