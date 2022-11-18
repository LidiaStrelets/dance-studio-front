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

export interface Personal {
  id: string;
  coach_id: string;
  hall_id: string;
  class_id: string;
  date_time: Date;
  duration: number;
  status: TStatus;
  message?: string;
}

export enum Statuses {
  created = 'created',
  submitted = 'submitted',
  approved = 'approved',
}

export type TStatus = 'created' | 'submitted' | 'approved';

export interface PersonalSchedule extends Schedule {
  client_id: string;
}
