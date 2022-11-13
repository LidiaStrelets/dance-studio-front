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
