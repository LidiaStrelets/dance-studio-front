import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '@app/types';
import { TranslateService } from '@ngx-translate/core';
import {
  TrainingFull,
  TrainingWithInfo,
  TrainingWithInfoFull,
} from '@schedulesModule/types';
import { ELanguages, Hall, Languages } from '@homeModule/types';
import { ClassItem, ClassItemFull } from '@classesModule/types';
import { Price } from '@pricesModule/types';
import { SubscriptionOptions } from '@paymentsModule/types';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  languageKey = LocalStorageKeys.language;
  private languages: Languages[] = [];
  private language: Languages = ELanguages.en;

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs([ELanguages.en, ELanguages.uk]);
    this.languages = this.translateService.getLangs() as Languages[];
  }

  setLanguage = (language: Languages) => {
    this.language = language;

    this.translateService.use(language);

    localStorage.setItem(this.languageKey, language);
  };

  getLanguage = () =>
    (localStorage.getItem('language') as Languages) || this.language;

  getLanguages = () => this.languages;

  isUk = () => this.getLanguage() === ELanguages.uk;

  translateSchedule = (items: TrainingFull[]) => {
    let scheduleItems;
    if (!this.isUk()) {
      scheduleItems = items.map((item) => ({
        coach_id: item.coach_id,
        hall_id: item.hall_id,
        class_id: item.class_id,
        coach: item.coach,
        hall: item.hall,
        class: item.class,
        date_time: item.date_time,
        id: item.id,
        duration: item.duration,
      }));
    } else {
      scheduleItems = items.map((item) => ({
        coach_id: item.coach_id,
        hall_id: item.hall_id,
        class_id: item.class_id,
        coach: item.coach,
        hall: item.hallUk,
        class: item.classUk,
        date_time: item.date_time,
        id: item.id,
        duration: item.duration,
      }));
    }
    return scheduleItems;
  };

  translateSingleSchedule = (item: TrainingWithInfoFull): TrainingWithInfo => {
    let translated;
    if (!this.isUk()) {
      translated = {
        coach_id: item.coach_id,
        hall_id: item.hall_id,
        class_id: item.class_id,
        coach: item.coach,
        hall: item.hall,
        class: item.class,
        date_time: item.date_time,
        id: item.id,
        duration: item.duration,
        coachInfo: item.coachInfo,
        classInfo: item.classInfo,
      };
    } else {
      translated = {
        coach_id: item.coach_id,
        hall_id: item.hall_id,
        class_id: item.class_id,
        coach: item.coach,
        hall: item.hallUk,
        class: item.classUk,
        date_time: item.date_time,
        id: item.id,
        duration: item.duration,
        coachInfo: item.coachInfo,
        classInfo: item.classInfoUk,
      };
    }
    return translated;
  };

  translateClasses = (items: ClassItemFull[]): ClassItem[] =>
    items.map(({ id, name, nameUk, description, descriptionUk }) =>
      this.isUk()
        ? { id, name: nameUk, description: descriptionUk }
        : { id, name, description }
    );

  translateHalls = (items: Hall[]) => {
    if (!this.isUk()) {
      return items.map(({ name, description, id, picture }) => ({
        name,
        description,
        id,
        picture,
      }));
    } else {
      return items.map(({ nameUk, descriptionUk, id, picture }) => ({
        name: nameUk,
        description: descriptionUk,
        id,
        picture,
      }));
    }
  };

  translateClassesAmount = (price: Price) => {
    if (this.isUk()) {
      let option: SubscriptionOptions;
      switch (price.classes_amount) {
        case 1000:
          option = {
            option: `Безлімітний`,
            value: 1000,
            price: price.price,
          };
          break;
        case 1:
          option = {
            option: `${price.classes_amount} заняття`,
            value: price.classes_amount,
            price: price.price,
          };
          break;
        case 2:
          option = {
            option: `${price.classes_amount} заняття`,
            value: price.classes_amount,
            price: price.price,
          };
          break;
        case 4:
          option = {
            option: `${price.classes_amount} заняття`,
            value: price.classes_amount,
            price: price.price,
          };
          break;
        case 8:
          option = {
            option: `${price.classes_amount} занять`,
            value: price.classes_amount,
            price: price.price,
          };
          break;
        case 16:
          option = {
            option: `${price.classes_amount} занять`,
            value: price.classes_amount,
            price: price.price,
          };
          break;
        default:
          option = {} as SubscriptionOptions;
      }
      return option;
    } else {
      return price.classes_amount === 1000
        ? { option: `Unlimited`, value: 1000, price: price.price }
        : {
            option: `${price.classes_amount} classes`,
            value: price.classes_amount,
            price: price.price,
          };
    }
  };
}
