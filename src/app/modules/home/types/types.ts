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
