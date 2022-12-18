import { Training } from '@schedulesModule/types';

export enum PersonalFormFields {
  coach = 'coach',
  class = 'class',
  date = 'date',
  duration = 'duration',
  message = 'message',
}

export type TPersonalFormFields =
  | 'coach'
  | 'class'
  | 'date'
  | 'duration'
  | 'message';

export interface CreatePersonal {
  coach_id: string;
  hall_id?: string;
  class_id: string;

  date_time: string;
  duration: number;
  status: TStatus;
  message?: string;
}

export type UpdatePersonal = Pick<
  CreatePersonal,
  'hall_id' | 'status' | 'message'
>;

export interface Personal extends Omit<Training, 'hall_id'> {
  status: TStatus;
  client_id: string;
  hall_id?: string;
}

export enum Statuses {
  created = 'created',
  submitted = 'submitted',
  approved = 'approved',
  cancelled = 'cancelled',
}

export type TStatus = 'created' | 'submitted' | 'approved' | 'cancelled';
