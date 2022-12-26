import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '@app/common/types/types';
import { TranslateService } from '@ngx-translate/core';
import {
  TrainingFull,
  TrainingWithInfo,
  TrainingWithInfoFull,
} from '@schedulesModule/types/types';
import { ELanguages, Hall, Languages } from '@homeModule/types/types';
import { ClassItem, ClassItemFull } from '@classesModule/types/types';
import { Price } from '@pricesModule/types/types';
import { SubscriptionOption } from '@paymentsModule/types/types';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageKey = LocalStorageKeys.language;
  private languages: Languages[] = [];
  private language: Languages = ELanguages.en;
  public isUk = this.getLanguage() === ELanguages.uk;

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs([ELanguages.en, ELanguages.uk]);
    this.languages = this.translateService.getLangs() as Languages[];
  }

  public getLanguage() {
    return (localStorage.getItem('language') as Languages) || this.language;
  }

  public setLanguage(language: Languages) {
    this.language = language;

    this.translateService.use(language);

    localStorage.setItem(this.languageKey, language);
  }

  public getLanguages() {
    return this.languages;
  }

  public translateSchedule(items: TrainingFull[]) {
    let scheduleItems;
    if (!this.isUk) {
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
  }

  public translateSingleSchedule(item: TrainingWithInfoFull): TrainingWithInfo {
    let translated;
    if (!this.isUk) {
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
  }

  public translateClasses(items: ClassItemFull[]): ClassItem[] {
    return items.map(({ id, name, nameUk, description, descriptionUk }) =>
      this.isUk
        ? { id, name: nameUk, description: descriptionUk }
        : { id, name, description }
    );
  }

  public translateHalls(items: Hall[], language?: Languages) {
    if (language === 'EN' || !this.isUk) {
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
  }

  public translateClassesAmount(price: Price) {
    if (this.isUk) {
      let option: SubscriptionOption;
      switch (price.classes_amount) {
        case 1000:
          option = {
            option: `Безлімітний`,
            value: 1000,
            ...price,
          };
          break;
        case 1:
          option = {
            option: `${price.classes_amount} заняття`,
            value: price.classes_amount,
            ...price,
          };
          break;
        case 2:
          option = {
            option: `${price.classes_amount} заняття`,
            value: price.classes_amount,
            ...price,
          };
          break;
        case 4:
          option = {
            option: `${price.classes_amount} заняття`,
            value: price.classes_amount,
            ...price,
          };
          break;
        case 8:
          option = {
            option: `${price.classes_amount} занять`,
            value: price.classes_amount,
            ...price,
          };
          break;
        case 16:
          option = {
            option: `${price.classes_amount} занять`,
            value: price.classes_amount,
            ...price,
          };
          break;
        default:
          option = {} as SubscriptionOption;
      }
      return option;
    } else {
      return price.classes_amount === 1000
        ? { option: `Unlimited`, value: 1000, ...price }
        : {
            option: `${price.classes_amount} classes`,
            value: price.classes_amount,
            ...price,
          };
    }
  }
}
