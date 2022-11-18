import { Schedule } from '@schedulesModule/types';

export type ClassType = 'group' | 'personal';

export interface PersonalClass extends Schedule {
  type: ClassType;
  clients?: string[];
}

export enum EClassTypes {
  group = 'group',
  personal = 'personal',
}
