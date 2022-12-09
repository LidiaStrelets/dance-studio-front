import { TStatus } from '@personalsModule/types';
import { Schedule } from '@schedulesModule/types';

export type ClassType = 'group' | 'personal';

export interface CoachClass extends Schedule {
  type: ClassType;
  clients?: string[];
  status?: TStatus;
  message?: string[];
}

export enum EClassTypes {
  group = 'group',
  personal = 'personal',
}
