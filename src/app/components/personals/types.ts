import { Schedule } from '@schedulesModule/types';

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
  date_time: Date;
  duration: number;
  status: TStatus;
  message?: string;
}

export type UpdatePersonal = Pick<
  CreatePersonal,
  'hall_id' | 'status' | 'message'
>;

export interface Personal extends Omit<CreatePersonal, 'message'> {
  id: string;
  client_id: string;
  message?: string[];
}

export enum Statuses {
  created = 'created',
  submitted = 'submitted',
  approved = 'approved',
  cancelled = 'cancelled',
}

export type TStatus = 'created' | 'submitted' | 'approved' | 'cancelled';

export interface PersonalSchedule extends Schedule {
  client_id: string;
  status?: TStatus;
  message?: string[];
}
