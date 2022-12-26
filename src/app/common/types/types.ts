import { FormGroup, ValidationErrors } from '@angular/forms';
import { TRegistrationFormFields } from '@authModule/types/types';
import { CancellEnrollmentEvent } from '@enrollmentsModule/types/types';
import { CreatePersonal, Personal } from '@personalsModule/types/types';

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
  personalSuccessMessage: string;
  notesUpdatedMessage: string;
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
  personalSuccessMessage = 'personalSuccessMessage',
  notesUpdatedMessage = 'notesUpdatedMessage',
}

export interface ErrorMessages {
  required?: string;
  pattern?: { password: string; duration: string };
  email?: string;
  keyRequired?: string;
  min?: string;
  max?: string;
}

export interface ReturnErrorMessages extends Omit<ErrorMessages, 'pattern'> {
  pattern: string;
}

export interface WithDate {
  date_time: string;
}

export enum SocketEvents {
  personalCreated = 'personal-created',
  newPersonal = 'new-personal',
  messageCreated = 'message-created',
  newMessage = 'new-message',
}

export type DateFormat = 'time' | 'date' | 'date-time';

export interface PersonalMessage {
  id?: string;
  personal_id: string;
  message: string;
}

export type CancellFunction = ({ scheduleId }: CancellEnrollmentEvent) => void;

export type ConfirmAlertHandler = (data: CreatePersonal) => void;

export type AreYouSureHandler = (scheduleId: string) => void;

export type PersonalSubscriptionCallback = (item: Personal) => void;

export type MessagesSubscriptionCallback = (item: PersonalMessage) => void;
