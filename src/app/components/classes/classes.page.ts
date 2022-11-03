import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ClassItemFull, ELanguages } from 'src/types';
import { ClassesService } from './services/classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {
  classItems: ClassItemFull[] = [];

  constructor(
    private classesService: ClassesService,
    private loader: LoaderService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.loader.showSpinner();

    this.classesService.getClasses()?.subscribe({
      next: (res) => {
        this.classItems = res;
        this.loader.hideSpinner();
        console.log(this.classItems);
      },
      error: (err) => {
        this.loader.hideSpinner();
        catchError(err);
      },
    });
  }

  getClasses = () =>
    this.classItems.map(({ id, name, nameUk, description, descriptionUk }) =>
      this.languageService.getLanguage() === ELanguages.en
        ? { id, name, description }
        : { id, name: nameUk, description: descriptionUk }
    );
}
