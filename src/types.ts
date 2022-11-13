import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export type LoginForm = FormGroup<{
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}>;

export interface LoginData {
  email: string;
  password: string;
}

export type TLoginFormFields = 'email' | 'password';

export enum LoginFormFields {
  email = 'email',
  password = 'password',
}

export type RegistrationForm = FormGroup<{
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  role: FormControl<TRoles | null>;
  adminKey: FormControl<string | null>;
}>;

export interface RegistrationData extends LoginData {
  firstname: string;
  lastname: string;
  role: TRoles;
  adminKey?: string;
}

export type TRoles = 'admin' | 'client' | 'coach';

export enum Roles {
  admin = 'admin',
  client = 'client',
  coach = 'coach',
}

export type TRegistrationFormFields =
  | 'email'
  | 'password'
  | 'firstname'
  | 'lastname'
  | 'role'
  | 'adminKey';

export enum RegistrationFormFields {
  email = 'email',
  password = 'password',
  firstname = 'firstname',
  lastname = 'lastname',
  role = 'role',
  adminKey = 'adminKey',
}

export interface TokenResponce {
  data: { token: string };
}

export interface TokenData {
  id?: string;
  role?: TRoles;
}

export interface Hall {
  id: string;
  name: string;
  description: string;
  nameUk: string;
  descriptionUk: string;
  polesAmount: number;
  picture: string;
}

export interface TranslatedHall {
  id: string;
  name: string;
  description: string;
  picture: string;
}

export type Languages = 'EN' | 'UK';

export enum ELanguages {
  en = 'EN',
  uk = 'UK',
}

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

export interface User {
  birth_date?: Date;
  email: string;
  firstname: string;
  id: string;
  information?: string;
  lastname: string;
  photo?: string | null;
  role: TRoles;
}

export interface UserRequest {
  birth_date?: Date | null;
  firstname?: string;
  information?: string;
  lastname?: string;
  photo?: string | null;
}

export type UserForm = FormGroup<{
  birth_date: FormControl<string | null>;
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  information: FormControl<string | null>;
  photo: FormControl<File | null>;
}>;

export enum UserFormFields {
  birth_date = 'birth_date',
  firstname = 'firstname',
  lastname = 'lastname',
  information = 'information',
  photo = 'photo',
}

export type UserDeletedFields =
  | UserFormFields.birth_date
  | UserFormFields.information
  | UserFormFields.photo;

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

export interface Schedule {
  coach_id: string;
  hall_id: string;
  class_id: string;
  coach: string;
  hall: string;
  class: string;
  date_time: Date;
  id: string;
  duration: number;
  enrolled?: boolean;
}
export interface ScheduleFull {
  coach_id: string;
  hall_id: string;
  class_id: string;
  coach: string;
  hall: string;
  class: string;
  hallUk: string;
  classUk: string;
  date_time: Date;
  id: string;
  duration: number;
}

export interface SingleScheduleFull extends ScheduleFull {
  coachInfo: string;
  classInfo: string;
  classInfoUk: string;
}

export interface ClassItem {
  name: TClass;
  description: string;
  id: string;
}

export interface ClassItemFull {
  name: TClass;
  description: string;
  nameUk: TClassUk;
  descriptionUk: string;
  id: string;
}

export type TClass =
  | 'stretching'
  | 'pole sport'
  | 'pole exotic'
  | 'stripplastic'
  | 'pole exotic beginners';

export type TClassUk =
  | 'розтяжка'
  | 'пілон спорт'
  | 'пілон танець'
  | 'стріппластика'
  | 'пілон танець початківці';

export enum Classes {
  stretching = '612d54d2-dcbd-4bea-a568-f82f685326ff',
  'pole sport' = '00834e12-71a7-4af1-9c79-9d1a04c66c07',
  'pole exotic' = '99e38df0-7b7a-4a7a-983c-4bc998d1898c',
  stripplastic = '9f68282e-236e-46c4-b0cf-b95dbd4da606',
  'pole exotic beginners' = '33642e32-0644-491d-8c59-c99a156620ad',
}

export interface Registration {
  schedule_id: string;
  client_id: string;
  id: string;
}

export interface CancellEnrollmentEvent {
  scheduleId: string;
}

export interface Price {
  id: string;
  classes_amount: number;
  price: number;
}

export interface Payment {
  id: string;
  price_id: string;
  user_id: string;
  createdAt: Date;
  available_spots: number;
}

export interface SubscriptionOptions {
  option: string;
  value: number;
  price: number;
}

export interface Stats {
  totalClasses: number;
  totalMinutes: number;
  stretching?: number;
  poleSport?: number;
  poleExotic?: number;
  stripPlastic?: number;
  exoticBeginners?: number;
}

export type StatsKeys = keyof Stats;
