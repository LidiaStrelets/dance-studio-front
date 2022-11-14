import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { LanguageService } from '@services/language.service';
import { LoaderService } from '@services/loader.service';
import { ClassItemFull } from '@classesModule/types';
import { ClassesService } from '@classesModule/services/classes.service';

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
      },
      error: (err) => {
        this.loader.hideSpinner();
        catchError(err);
      },
    });
  }

  getClasses = () =>
    this.classItems.map(({ id, name, nameUk, description, descriptionUk }) =>
      this.languageService.isUk()
        ? { id, name: nameUk, description: descriptionUk }
        : { id, name, description }
    );
}
