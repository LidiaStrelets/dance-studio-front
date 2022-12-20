import { TStatus } from '@personalsModule/types';
import { Training } from '@schedulesModule/types';

export type ClassType = 'group' | 'personal';

export interface CoachClass extends Omit<Training, 'hall_id'> {
  type: ClassType;
  clients?: string[];
  status?: TStatus;
  hall_id?: string;
}

export enum EClassTypes {
  group = 'group',
  personal = 'personal',
}

export interface NoteUpdate {
  class_id: string;
  notes: string;
}

export interface Note extends NoteUpdate {
  id: string;
}
